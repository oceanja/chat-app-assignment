const NoChatSelected = () => {
    return (
        <div className="chat-main">
            <div className="empty-state">
                <div className="empty-icon">💬</div>
                <div className="empty-title">Start a conversation</div>
                <div className="empty-sub">Select a chat from the sidebar or click the compose button to message someone new.</div>
            </div>
        </div>
    );
};

export default NoChatSelected;
