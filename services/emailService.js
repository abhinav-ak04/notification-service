import nodemailer from 'nodemailer';
import sendgridTransport from 'nodemailer-sendgrid';
import 'dotenv/config.js';

const transporter = nodemailer.createTransport(
    sendgridTransport({
        apiKey: process.env.SENDGRID_API_KEY, // Must be set in your .env
    })
);

export const sendEmail = async (to, subject, text) => {
    const info = await transporter.sendMail({
        from: `"Abhinav" <${process.env.SENDGRID_VERIFIED_EMAIL}>`, // Use your verified sender email
        to,
        subject,
        text,
    });

    console.log(`✉️ Email sent: ${info.messageId}`);
};
