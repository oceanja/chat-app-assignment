import { Server } from 'socket.io';
import http from 'http';
import express from 'express';

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: process.env.FRONTEND_URL || ["http://localhost:5173"],
        methods: ["GET", "POST"]
    }
});

// A map to keep track of connected users: { userId: socketId }
export const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
};

const userSocketMap = {};

io.on('connection', (socket) => {
    console.log('A user connected', socket.id);

    const userId = socket.handshake.query.userId;
    if (userId && userId !== "undefined") {
        userSocketMap[userId] = socket.id;
    }

    // Broadcast when a user connects (to update online status)
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    // Listen to specific conversation rooms if needed
    socket.on('join_conversation', (conversationId) => {
        socket.join(conversationId);
        console.log(`User ${userId} joined conversation room: ${conversationId}`);
    });

    socket.on('typing', ({ conversationId, userId }) => {
        // conversationId is actually the receiver's userId in the current client implementation
        const receiverSocketId = userSocketMap[conversationId];
        if (receiverSocketId) {
            io.to(receiverSocketId).emit('typing', { userId });
        }
    });

    socket.on('stop_typing', ({ conversationId, userId }) => {
        const receiverSocketId = userSocketMap[conversationId];
        if (receiverSocketId) {
            io.to(receiverSocketId).emit('stop_typing', { userId });
        }
    });

    socket.on('mark_read', async ({ messageId, senderId }) => {
        try {
            const Message = (await import('../models/message.model.js')).default;
            await Message.findByIdAndUpdate(messageId, { isRead: true });

            // Notify the sender that their message was read
            const senderSocketId = getReceiverSocketId(senderId);
            if (senderSocketId) {
                io.to(senderSocketId).emit('message_read', { messageId, readerId: userId });
            }
        } catch (error) {
            console.error("Error marking message as read:", error);
        }
    });

    socket.on('disconnect', () => {
        console.log('User disconnected', socket.id);
        if (userId && userId !== "undefined") {
            delete userSocketMap[userId];
        }
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
});

export { app, io, server };
