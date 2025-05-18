import { Queue } from 'bullmq';
import { config } from 'dotenv';

config();

const notificationQueue = new Queue('notifications', {
    connection: {
        host: process.env.REDIS_HOST || '127.0.0.1',
        port: process.env.REDIS_PORT || 6379,
    },
});

export default notificationQueue;
