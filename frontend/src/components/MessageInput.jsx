import { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";

const MessageInput = () => {
    const [text, setText] = useState("");
    const { sendMessage, selectedUser } = useChatStore();
    const { socket, authUser } = useAuthStore();
    const inputRef = useRef(null);
    const typingTimeoutRef = useRef(null);

    const handleInputChange = (e) => {
        setText(e.target.value);

        if (!socket || !selectedUser) return;

        socket.emit("typing", {
            conversationId: selectedUser._id, // Simplification for rooms
            userId: authUser._id
        });

        if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);

        typingTimeoutRef.current = setTimeout(() => {
            socket.emit("stop_typing", {
                conversationId: selectedUser._id,
                userId: authUser._id
            });
        }, 2000);
    };

    const handleSendMessage = async (e) => {
        if (e) e.preventDefault();
        if (!text.trim()) return;

        try {
            await sendMessage({
                message: text.trim(),
            });

            // Clear form
            setText("");
            if (inputRef.current) {
                inputRef.current.focus();
            }
        } catch (error) {
            console.error("Failed to send message:", error);
        }
    };

    return (
        <div className="chat-input-bar">
            <div className="input-wrap">
                <span className="input-action">😊</span>
                <input
                    type="text"
                    placeholder={`Message ${selectedUser?.name}...`}
                    value={text}
                    onChange={handleInputChange}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage(e);
                        }
                    }}
                    ref={inputRef}
                />
                <span className="input-action">📎</span>
                <span className="input-action">🎤</span>
            </div>
            <button
                className="send-btn"
                onClick={handleSendMessage}
                disabled={!text.trim() || !socket}
            >
                ➤
            </button>
        </div>
    );
};

export default MessageInput;
