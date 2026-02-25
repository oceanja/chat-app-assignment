import { useChatStore } from "../store/useChatStore";
import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";

const HomePage = () => {
    const { selectedUser } = useChatStore();

    return (
        <div className={`app-shell ${selectedUser ? "chat-open" : "sidebar-open"}`}>
            <Sidebar />
            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
        </div>
    );
};

export default HomePage;
