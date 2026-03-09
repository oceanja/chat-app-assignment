import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import { app, server } from './socket/socket.js';
import express from 'express';

dotenv.config();

const PORT = process.env.PORT || 5001;

// Keep Render free tier awake
if (process.env.NODE_ENV === "production") {
    setInterval(() => {
        fetch(`${process.env.RENDER_EXTERNAL_URL}/api/auth/ping`).catch(() => {});
    }, 14 * 60 * 1000);
}

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
}));

// Connect to MongoDB
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1);
    }
};

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

server.listen(PORT, () => {
    connectDB();
    console.log(`Server running on port ${PORT}`);
});
