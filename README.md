# Nova AI – Chat Application Server

## Overview

Nova AI is a backend server designed to power an AI-driven chat application. It provides a scalable and secure infrastructure for managing users, authentication, chat conversations, and project-based AI interactions.

The server is built using **Node.js**, **Express.js**, and **MongoDB**, following a modular and maintainable architecture.

---

## Features

* User Authentication (Signup & Login)
* Email Verification
* Password Reset System
* Secure JWT-based Authentication
* Chat History Management
* Automatic Chat Naming (first message becomes chat title)
* Project-based Conversation Organization
* RESTful API Architecture
* Scalable Backend Structure

---

## Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Nodemailer (for email verification)
* dotenv
* bcrypt

---

## Project Structure

server/
│
├── config/ # Database configuration
├── controllers/ # Business logic
├── models/ # MongoDB schemas
├── routes/ # API routes
├── middleware/ # Authentication & validation middleware
├── utils/ # Helper functions
├── services/ # External services logic
│
├── .env
├── server.js
└── package.json

---

## Installation

Clone the repository

git clone https://github.com/your-username/nova-ai-server.git

Move into the project folder

cd nova-ai-server

Install dependencies

npm install

---

## Environment Variables

Create a `.env` file in the root directory.

Example:

PORT=5000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

EMAIL_USER=your_email

EMAIL_PASS=your_password

---

## Running the Server

Development Mode

npm run dev

Production Mode

npm start

---

## API Modules

Authentication

* Register user
* Login user
* Email verification
* Password reset

Chat

* Create chat
* Store chat history
* Retrieve conversations

Projects

* Create project
* Manage project chats

---

## Future Improvements

* Real-time chat using WebSockets
* Streaming AI responses
* Rate limiting
* Chat search functionality
* Multi-user collaboration

---

## Author

Ankit Gupta
Full Stack Developer
