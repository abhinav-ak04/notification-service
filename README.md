# 🔔 Notification Service

A robust and extensible Notification Service built with **Node.js**, **Express**, and **BullMQ**, supporting three types of notifications:

-   📩 Email (via SendGrid)
-   📱 SMS (via Twilio)
-   💬 In-App Notifications (via MongoDB)

This microservice-style backend handles high-volume notifications efficiently using Redis-backed queues and provides a scalable foundation for real-time alert systems.

---

## 🚀 Tech Stack

-   **Node.js** + **Express.js**
-   **BullMQ** + **Redis** for job queuing
-   **MongoDB** + **Mongoose** for data persistence
-   **SendGrid** for Email
-   **Twilio** for SMS
-   In-App notification storage for frontend consumption

---

## 📦 Features

-   Queue-based notification dispatch system
-   Supports Email, SMS, and In-App notification types
-   Job retries and failure handling
-   Modular design for easy extensibility
-   Logs all notifications and statuses in MongoDB

---

## 📁 Folder Structure

├── db/ # MongoDB connection\
├── jobs/ # BullMQ queue & worker logic\
├── models/ # Mongoose models (e.g., Notification.js)\
├── routes/ # API routes for notification requests\
├── services/ # Email & SMS service logic\
├── .env # Environment variables (not committed)\
└── index.js # Main server file\
└── .gitignore # Git ignore file\
└── package.json # Project metadata and dependencies\
└── README.md # Project documentation\

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/notification-service.git
cd notification-service
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a .env file in the root directory and add:

```bash
PORT=5000

# MongoDB
MONGODB_URI=mongodb://localhost:27017/notification-service

# Redis
REDIS_HOST=127.0.0.1
REDIS_PORT=6379

# SendGrid
SENDGRID_API_KEY=your_sendgrid_api_key
FROM_EMAIL=your_verified_sendgrid_email

# Twilio
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
TWILIO_PHONE_NUMBER=your_twilio_phone_number
```

### 4. Start Redis

Make sure Redis is running. If installed locally:

```bash
redis-server
```

### 5. Start the App

In two terminals:

Terminal 1:Start API server

```bash
npm run dev
```

Terminal 2 – Start Background Worker

```bash
node jobs/worker.js
```

## 📬 API Usage

### POST `/api/notifications/send`

Send a notification through a specific channel (email, sms, or inapp). The type field is required to determine the channel. Below are request examples for each type.

#### ✅ Request Body Examples:

##### 📱 SMS Notification

```json
{
    "type": "sms",
    "recipient": "+918697023711",
    "message": "🚀 Hello from Twilio SMS Notification Service!"
}
```

##### ✉️ Email Notification

```json
{
    "type": "email",
    "recipient": "user@example.com",
    "subject": "Welcome to Our App",
    "message": "Thanks for signing up! We’re glad to have you."
}
```

##### 🛎️ In-App Notification

```json
{
    "type": "inapp",
    "userId": "user123",
    "title": "New Message",
    "message": "You have a new notification in your inbox."
}
```

### GET `/api/notifications?userId=user123`

Fetches all in-app notifications for the specified user.

## 📌 Assumptions Made

-   All users are uniquely identified by a userId

*   Emails and phone numbers are provided at runtime (for simplicity)

-   In-App notifications are stored in a MongoDB notifications collection

## 🧑‍💻 Author

Made by:

-   Name: Abhinav Kumar
-   Roll No: 22051483
