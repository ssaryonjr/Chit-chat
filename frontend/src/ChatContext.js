import { createContext, useState } from "react";


const ChatContext = createContext();

export function ChatProvider({ children }) {
    const [selectedChat, setSelectedChat] = useState()
    const [chats, setChats] = useState([])
    const [search, setSearch] = useState("")
    const [showModal, setShowModal] = useState(false)
    const [currentChat, setCurrentChat] = useState()
    const [refreshList, setRefreshList] = useState()

    return (
        <ChatContext.Provider value={{
            selectedChat,
            setSelectedChat,
            search,
            setSearch,
            chats,
            setChats,
            showModal,
            setShowModal,
            currentChat,
            setCurrentChat,
        }}>
            {children}
        </ChatContext.Provider>
    )
}

export default ChatContext

