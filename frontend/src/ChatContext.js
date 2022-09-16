import { createContext, useState } from "react";
import MessagesTab from "./components/SideBar Components/MessagesTab";


const ChatContext = createContext();

export function ChatProvider({ children }) {
    const [selectedChat, setSelectedChat] = useState()
    const [chat, setChats] = useState([])
    const [search, setSearch] = useState("")
    const [currentTab, setCurrentTab] = useState(<MessagesTab />)
    

    return (
        <ChatContext.Provider value={{
            selectedChat,
            setSelectedChat,
            search,
            setSearch,
            currentTab,
            setCurrentTab
        }}>
            {children}
        </ChatContext.Provider>
    )
}

export default ChatContext

