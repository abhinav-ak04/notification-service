import twilio from 'twilio';
import 'dotenv/config.js';

const client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
);

export const sendSMS = async (to, body) => {
    try {
        const message = await client.messages.create({
            body,
            from: process.env.TWILIO_PHONE_NUMBER, // Must be a verified or purchased Twilio number
            to,
        });

        console.log(`📱 SMS sent: ${message.sid}`);
    } catch (error) {
        console.error('❌ SMS sending failed:', error.message);
        throw error;
    }
};
