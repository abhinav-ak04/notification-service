import { Worker } from 'bullmq';
import Notification from '../models/Notification.js';
import mongoose from 'mongoose';
import 'dotenv/config.js';
import { sendEmail } from '../services/emailService.js';
import { sendSMS } from '../services/smsService.js';

// Connect to MongoDB

// console.log(process.env.PORT);

mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log('✅ Worker connected to MongoDB'))
    .catch((err) => console.error('❌ Worker MongoDB connection error:', err));

const worker = new Worker(
    'notifications',
    async (job) => {
        const { _id, type, recipient, message } = job.data;

        console.log(`📩 Sending ${type} to ${recipient}: ${message}`);

        if (type === 'email') {
            await sendEmail(
                recipient,
                'New Notification from Our Service',
                message
            );
        } else if (type === 'sms') {
            await sendSMS(recipient, message);
        } else {
            // Simulate delay for other types (e.g., SMS or in-app)
            await new Promise((res) => setTimeout(res, 1000));
        }

        // Update status to "sent"
        await Notification.findByIdAndUpdate(_id, {
            status: 'sent',
        });
    },
    {
        connection: {
            host: process.env.REDIS_HOST || '127.0.0.1',
            port: process.env.REDIS_PORT || 6379,
        },
    }
);

// Job success and failure listeners
worker.on('completed', (job) => {
    console.log(`✅ Job ${job.id} completed`);
});

worker.on('failed', (job, err) => {
    console.log(`❌ Job ${job.id} failed:`, err.message);
});
