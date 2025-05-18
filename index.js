// Description: Main entry point of the notification service app

import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import connectDB from './db/connect.js';
import notificationRoutes from './routes/notifications.js';

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware to parse JSON body
app.use(express.json());

// Root route for health check or welcome
app.get('/', (req, res) => {
    res.send('🚀 Notification Service is Live!');
});

// Routes
app.use('/api/notifications', notificationRoutes);

// Start server
const start = async () => {
    try {
        await connectDB(process.env.MONGODB_URL);
        console.log('✅ Connected to MongoDB');

        app.listen(PORT, () => {
            console.log(`🌐 Server is running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('❌ Error starting server:', error);
    }
};

start();
