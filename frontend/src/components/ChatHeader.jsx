import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import { AVATARS } from "./Sidebar";
import { ArrowLeft } from "lucide-react";

const ChatHeader = () => {
    const { selectedUser, setSelectedUser, isTyping } = useChatStore();
    const { onlineUsers } = useAuthStore();

    return (
        <div className="chat-header">
            <div className="chat-header-left">
                <div className="icon-btn back-btn" onClick={() => setSelectedUser(null)}>
                    <ArrowLeft size={18} />
                </div>
                <div className="avatar-wrap">
                    <div className="avatar" style={{ width: 42, height: 42, fontSize: 16, background: AVATARS[0] }}>
                        {selectedUser.name.charAt(0)}
                    </div>
                    {onlineUsers.includes(selectedUser._id) && <div className="online-dot" />}
                </div>
                <div>
                    <div className="chat-user-name">{selectedUser.name}</div>
                    <div className="chat-status">
                        {isTyping ? (
                            <><span style={{ fontSize: 12 }}>typing</span><span>...</span></>
                        ) : onlineUsers.includes(selectedUser._id) ? (
                            <><span className="status-dot" /><span>Online</span></>
                        ) : (
                            <span style={{ color: "var(--text3)" }}>Offline</span>
                        )}
                    </div>
                </div>
            </div>
            <div className="chat-actions">
                <div className="icon-btn">📞</div>
                <div className="icon-btn">📹</div>
                <div className="icon-btn" onClick={() => setSelectedUser(null)}>✕</div>
            </div>
        </div>
    );
};

export default ChatHeader;
