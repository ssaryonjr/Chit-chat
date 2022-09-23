import { createContext, useState } from "react";
import GlobalUsers from "./components/SideBar Components/GlobalUsers";



const ChatContext = createContext();

export function ChatProvider({ children }) {
    const [selectedChat, setSelectedChat] = useState()
    const [chats, setChats] = useState([])
    const [search, setSearch] = useState("")
    const [currentTab, setCurrentTab] = useState(<GlobalUsers />)
    const [showModal, setShowModal] = useState(false)
    

    return (
        <ChatContext.Provider value={{
            selectedChat,
            setSelectedChat,
            search,
            setSearch,
            currentTab,
            setCurrentTab,
            chats,
            setChats,
            showModal,
            setShowModal
        }}>
            {children}
        </ChatContext.Provider>
    )
}

export default ChatContext

