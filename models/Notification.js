import mongoose from 'mongoose';

const NotificationSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['email', 'sms', 'in-app'],
        required: true,
    },
    recipient: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'sent', 'failed'],
        default: 'pending',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Notification = mongoose.model('Notification', NotificationSchema);

export default Notification;
