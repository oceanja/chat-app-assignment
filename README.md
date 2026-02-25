<div align="center">

# ⚡ Connect
### Global Real-time Messaging App

[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat-square&logo=node.js)](https://nodejs.org)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb)](https://mongodb.com)
[![Socket.io](https://img.shields.io/badge/Socket.io-4.x-010101?style=flat-square&logo=socket.io)](https://socket.io)

A production-grade, full-stack WhatsApp-style messaging app with real-time delivery, typing indicators, read receipts, and presence tracking — built with the MERN stack.

</div>

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🔐 **JWT Authentication** | Secure signup/login with HTTP-only cookies and bcrypt password hashing |
| 💬 **Real-time Messaging** | Instant message delivery via Socket.io — no page refresh needed |
| ✓✓ **Read Receipts** | Single tick (sent) → double tick (read), updated live |
| ⌨️ **Typing Indicators** | Animated "···" bubble when the other person is typing |
| 🟢 **Presence System** | Live Online / Last Seen status for every user |
| 🔍 **User Discovery** | Search all registered users to start a new chat |
| 📱 **Fully Responsive** | Optimised for desktop, tablet, and mobile — one pane at a time on small screens |
| 💾 **Message Persistence** | Full chat history stored in MongoDB, loads chronologically |

---

## 🖥️ Tech Stack

### Frontend
- **React 18** + **Vite** — fast dev server and build
- **Zustand** — lightweight global state (auth + chat)
- **Socket.io-client** — real-time WebSocket connection
- **Tailwind CSS** + custom CSS variables — dark-mode design system
- **date-fns** — message timestamps and "last seen" formatting
- **React Router v7** — client-side routing with auth guards

### Backend
- **Node.js** + **Express 5** — REST API
- **Socket.io** — bidirectional real-time events
- **Mongoose** — MongoDB ODM with schema validation
- **JSON Web Tokens** — stateless auth stored in HTTP-only cookies
- **bcryptjs** — password hashing

### Database
- **MongoDB Atlas** — cloud-hosted, fully managed

---

## 🗂️ Project Structure

```
global_connect/
├── backend/
│   ├── models/            # User, Conversation, Message schemas
│   ├── routes/            # Auth, Messages, Users (REST + logic inline)
│   ├── middleware/        # JWT protectRoute
│   ├── socket/            # Socket.io server & event handlers
│   ├── utils/             # Token generation helper
│   └── server.js          # Express app entry point
│
└── frontend/
    └── src/
        ├── pages/         # LoginPage, SignUpPage, HomePage
        ├── components/    # Sidebar, ChatContainer, ChatHeader, MessageInput …
        ├── store/         # useAuthStore, useChatStore (Zustand)
        └── lib/           # Axios instance
```

---

## ⚙️ Local Setup

### Prerequisites
- Node.js ≥ 18
- A [MongoDB Atlas](https://cloud.mongodb.com) cluster (free tier works)

### 1 — Clone the repo
```bash
git clone https://github.com/<your-username>/global_connect.git
cd global_connect
```

### 2 — Backend
```bash
cd backend
npm install
```

Create a `.env` file inside `backend/`:
```env
PORT=5001
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=a_long_random_secret_string
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

Start the server:
```bash
node server.js
```
> Server runs on **http://localhost:5001**

### 3 — Frontend
```bash
cd ../frontend
npm install
npm run dev
```
> App runs on **http://localhost:5173**

---

## 🧪 Testing the App

Open two browser windows (one normal, one incognito) and register two accounts to test:

| Feature | How to test |
|---------|------------|
| Real-time messages | Send from Window 1, appears instantly in Window 2 |
| Typing indicator | Start typing in Window 1, see "···" in Window 2 |
| Read receipts | ✓ appears on send; switches to ✓✓ when recipient opens chat |
| Online / Last Seen | Log out in Window 2, Window 1 updates to "Last seen just now" |
| Search | Type in the sidebar search box to filter users live |
| Mobile view | Resize browser to < 900px — sidebar and chat switch with a back arrow |

### Test accounts (if pre-seeded)
| Email | Password |
|-------|----------|
| `test1@example.com` | `password` |
| `test2@example.com` | `password` |

---

## 🔌 Socket.io Event Reference

| Event | Direction | Purpose |
|-------|-----------|---------|
| `getOnlineUsers` | Server → All | Broadcast updated online user list |
| `newMessage` | Server → Receiver | Deliver a new message in real time |
| `typing` | Client → Server → Receiver | Notify receiver that sender is typing |
| `stop_typing` | Client → Server → Receiver | Clear typing indicator |
| `mark_read` | Client → Server | Mark a message as read in the DB |
| `message_read` | Server → Sender | Update sender's tick from ✓ to ✓✓ |

---

## 📡 REST API Reference

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/signup` | — | Register a new user |
| POST | `/api/auth/login` | — | Login and receive JWT cookie |
| POST | `/api/auth/logout` | ✅ | Logout and clear cookie |
| GET | `/api/auth/me` | ✅ | Get currently logged-in user |
| GET | `/api/users` | ✅ | List all users (supports `?search=`) |
| GET | `/api/messages/:id` | ✅ | Fetch conversation history |
| POST | `/api/messages/send/:id` | ✅ | Send a message |

---

## 🚀 Deployment

| Service | Platform | Notes |
|---------|----------|-------|
| Frontend | [Vercel](https://vercel.com) | Set root to `frontend/`, framework: Vite |
| Backend | [Render](https://render.com) | Set `NODE_ENV=production`, add all env vars |
| Database | MongoDB Atlas | Already cloud-hosted |

When deploying, set `FRONTEND_URL` on Render to your Vercel domain and update the Vite API base URL for production.

---

## 📋 Assignment Requirements Checklist

- [x] JWT-based authentication (signup / login / logout)
- [x] User profile with display name and About status
- [x] Searchable user list for starting new chats
- [x] Real-time 1-on-1 messaging via Socket.io
- [x] Message persistence — full history loaded from MongoDB
- [x] Online / Last Seen presence indicators
- [x] Typing status indicator
- [x] Read receipts (✓ sent → ✓✓ read)
- [x] Responsive UI for mobile and desktop

---

<div align="center">
Built with the MERN stack · Socket.io · Tailwind CSS
</div>
