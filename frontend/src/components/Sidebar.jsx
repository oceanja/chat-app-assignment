import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { LogOut } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export const AVATARS = [
    "linear-gradient(135deg,#4ade80,#22d3ee)",
    "linear-gradient(135deg,#f472b6,#a855f7)",
    "linear-gradient(135deg,#fb923c,#f43f5e)",
    "linear-gradient(135deg,#60a5fa,#6366f1)",
    "linear-gradient(135deg,#facc15,#f97316)",
];

const Sidebar = () => {
    const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
    const { onlineUsers, authUser, logout } = useAuthStore();
    const [searchQuery, setSearchQuery] = useState("");
    const [sidebarTab, setSidebarTab] = useState("chats");

    useEffect(() => {
        getUsers();
    }, [getUsers]);

    const filteredUsers = users.filter((u) =>
        u.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (isUsersLoading) return <SidebarSkeleton />;

    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <div className="sidebar-title syne">Connect</div>
                <div style={{ display: "flex", gap: 8 }}>
                    <div className="icon-btn" title="Logout" onClick={logout}>
                        <LogOut size={16} />
                    </div>
                    <div className="avatar" style={{ width: 36, height: 36, fontSize: 14, background: AVATARS[0], cursor: "pointer", flexShrink: 0, borderRadius: "50%" }}>
                        {authUser?.name?.charAt(0) || "U"}
                    </div>
                </div>
            </div>

            <div className="sidebar-search">
                <div className="search-wrap">
                    <span className="search-icon">🔍</span>
                    <input
                        type="text"
                        placeholder="Search conversations..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            <div className="nav-tabs">
                {[
                    { id: "chats", icon: "💬", label: "Chats" },
                    { id: "contacts", icon: "👥", label: "People" },
                    { id: "archived", icon: "📂", label: "Archived" }
                ].map(t => (
                    <div key={t.id} className={`nav-tab ${sidebarTab === t.id ? "active" : ""}`} onClick={() => setSidebarTab(t.id)}>
                        {t.icon}
                        <span>{t.label}</span>
                    </div>
                ))}
            </div>

            <div className="conv-list">
                <div className="section-label">All Users</div>
                {filteredUsers.map((user, index) => (
                    <div
                        key={user._id}
                        className={`conv-item ${selectedUser?._id === user._id ? "active" : ""}`}
                        onClick={() => setSelectedUser(user)}
                    >
                        <div className="avatar-wrap">
                            <div className="avatar" style={{ width: 46, height: 46, fontSize: 16, background: AVATARS[index % AVATARS.length] }}>
                                {user.name.charAt(0)}
                            </div>
                            {onlineUsers.includes(user._id) && <div className="online-dot" />}
                        </div>
                        <div className="conv-meta">
                            <div className="conv-name">
                                <span>{user.name}</span>
                            </div>
                            <div className="conv-preview">
                                {onlineUsers.includes(user._id) ? (
                                    <span style={{ color: "var(--accent)" }}>Online</span>
                                ) : user.lastSeen ? (
                                    <span>Last seen {formatDistanceToNow(new Date(user.lastSeen), { addSuffix: true })}</span>
                                ) : (
                                    <span>Offline</span>
                                )}
                            </div>
                        </div>
                    </div>
                ))}

                {filteredUsers.length === 0 && (
                    <div style={{ padding: "40px 20px", textAlign: "center", color: "var(--text3)", fontSize: 14 }}>
                        No users found
                    </div>
                )}
            </div>
        </div>
    );
};

export default Sidebar;
