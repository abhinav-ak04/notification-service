import express from 'express';
import Notification from '../models/Notification.js';
import notificationQueue from '../jobs/queue.js'; // correct path assumed

const router = express.Router();

// POST /api/notifications/send
router.post('/send', async (req, res) => {
    try {
        const { type, recipient, message } = req.body;

        if (!type || !recipient || !message) {
            return res.status(400).json({ error: 'All fields are required.' });
        }

        // Save to DB with status: 'pending'
        const notification = await Notification.create({
            type,
            recipient,
            message,
            status: 'pending', // 👈 add this if your schema supports it
        });

        // Add job to queue
        await notificationQueue.add('sendNotification', {
            _id: notification._id,
            type,
            recipient,
            message,
        });

        res.status(201).json({
            success: true,
            message: 'Notification queued successfully!',
            data: notification,
        });
    } catch (error) {
        console.error('Error sending notification:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});

// GET /api/notifications
router.get('/', async (req, res) => {
    try {
        const notifications = await Notification.find().sort({ createdAt: -1 });
        res.json({ success: true, data: notifications });
    } catch (error) {
        console.error('Error fetching notifications:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});

export default router;
