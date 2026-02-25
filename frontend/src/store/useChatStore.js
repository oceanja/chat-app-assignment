import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,
    isTyping: false,

    getUsers: async () => {
        set({ isUsersLoading: true });
        try {
            const res = await axiosInstance.get("/users");
            set({ users: res.data });
        } catch (error) {
            toast.error(error.response.data.error || "Failed to fetch users");
        } finally {
            set({ isUsersLoading: false });
        }
    },

    getMessages: async (userId) => {
        set({ isMessagesLoading: true });
        try {
            const res = await axiosInstance.get(`/messages/${userId}`);
            set({ messages: res.data });

            // Mark every unread incoming message as read now that the chat is open
            const socket = useAuthStore.getState().socket;
            const authUser = useAuthStore.getState().authUser;
            if (socket && authUser) {
                res.data.forEach((msg) => {
                    // sender may be a populated object (REST) or a plain string ID (socket)
                    const senderId = (msg.sender?._id ?? msg.sender)?.toString();
                    const isIncoming = senderId !== authUser._id?.toString();
                    if (!msg.isRead && isIncoming) {
                        socket.emit("mark_read", { messageId: msg._id, senderId });
                    }
                });
            }
        } catch (error) {
            toast.error(error.response.data.error || "Failed to fetch messages");
        } finally {
            set({ isMessagesLoading: false });
        }
    },

    sendMessage: async (messageData) => {
        const { selectedUser, messages } = get();
        try {
            const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
            set({ messages: [...messages, res.data] });
        } catch (error) {
            toast.error(error.response.data.error || "Failed to send message");
        }
    },

    subscribeToMessages: () => {
        const { selectedUser } = get();
        if (!selectedUser) return;

        const socket = useAuthStore.getState().socket;

        // Message received
        socket.on("newMessage", (newMessage) => {
            const senderId = (newMessage.sender?._id ?? newMessage.sender)?.toString();
            if (senderId !== selectedUser._id?.toString()) return;

            set({
                messages: [...get().messages, newMessage],
            });

            // Auto mark read since the chat is open
            socket.emit("mark_read", { messageId: newMessage._id, senderId });
        });

        // Typing indicators
        socket.on("typing", ({ conversationId, userId }) => {
            if (userId === selectedUser._id) {
                set({ isTyping: true });
            }
        });

        socket.on("stop_typing", ({ conversationId, userId }) => {
            if (userId === selectedUser._id) {
                set({ isTyping: false });
            }
        });

        // Read Receipts
        socket.on("message_read", ({ messageId }) => {
            set((state) => ({
                messages: state.messages.map((msg) =>
                    msg._id === messageId ? { ...msg, isRead: true } : msg
                ),
            }));
        });
    },

    unsubscribeFromMessages: () => {
        const socket = useAuthStore.getState().socket;
        socket.off("newMessage");
        socket.off("typing");
        socket.off("stop_typing");
        socket.off("message_read");
    },

    setSelectedUser: (selectedUser) => {
        set({ selectedUser, isTyping: false });
        const socket = useAuthStore.getState().socket;

        // When opening a chat, let the backend know we joined this conversation room
        if (selectedUser && socket) {
            // we'd need conversation ID here, for simplicity we emit it in the backend
        }
    },
}));
