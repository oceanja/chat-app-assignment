import { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { format } from "date-fns";
import { AVATARS } from "./Sidebar";

const ChatContainer = () => {
    const { messages, getMessages, isMessagesLoading, selectedUser, subscribeToMessages, unsubscribeFromMessages, isTyping } = useChatStore();
    const { authUser } = useAuthStore();
    const messageEndRef = useRef(null);

    useEffect(() => {
        if (selectedUser) {
            getMessages(selectedUser._id);
            subscribeToMessages();
        }

        return () => unsubscribeFromMessages();
    }, [selectedUser, getMessages, subscribeToMessages, unsubscribeFromMessages]);

    useEffect(() => {
        if (messageEndRef.current && messages) {
            messageEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages, isTyping]);

    if (isMessagesLoading) {
        return (
            <div className="chat-main">
                <ChatHeader />
                <MessageSkeleton />
                <MessageInput />
            </div>
        );
    }

    return (
        <div className="chat-main">
            <ChatHeader />

            <div className="messages-area">
                <div className="date-sep">Today</div>

                {messages.map((message) => {
                    // sender is a populated object from REST API but a plain string ID from socket events
                    const senderId = message.sender?._id ?? message.sender;
                    const isMe = senderId?.toString() === authUser._id?.toString();
                    return (
                        <div key={message._id} className={`msg-row ${isMe ? "me" : "them"}`}>
                            {!isMe && (
                                <div className="msg-avatar" style={{ background: AVATARS[0] }}>
                                    {selectedUser.name.charAt(0)}
                                </div>
                            )}
                            <div className="msg-content">
                                <div className={`bubble ${isMe ? "me" : "them"}`}>
                                    {message.content}
                                </div>
                                <div className="bubble-meta">
                                    <span>{format(new Date(message.createdAt), "HH:mm")}</span>
                                    {isMe && <span className="read-tick">{message.isRead ? "✓✓" : "✓"}</span>}
                                </div>
                            </div>
                        </div>
                    );
                })}

                {isTyping && (
                    <div className="msg-row them">
                        <div className="msg-avatar" style={{ background: AVATARS[0] }}>
                            {selectedUser.name.charAt(0)}
                        </div>
                        <div className="typing-bubble">
                            <div className="typing-dot" />
                            <div className="typing-dot" />
                            <div className="typing-dot" />
                        </div>
                    </div>
                )}

                <div ref={messageEndRef} />
            </div>

            <MessageInput />
        </div>
    );
};

export default ChatContainer;
