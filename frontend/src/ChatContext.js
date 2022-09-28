import { createContext, useState } from "react";


const ChatContext = createContext();

export function ChatProvider({ children }) {
    const [selectedChat, setSelectedChat] = useState()
    const [chats, setChats] = useState([])
    const [search, setSearch] = useState("")
    const [showModal, setShowModal] = useState(false)
    const [currentChat, setCurrentChat] = useState()
    const [isTyping, setIsTyping] = useState(false);
    const [showChatBox, setShowChatBox] = useState(true)
    const [showMessageList, setShowMessageList] = useState(true)
    const [width, setWidth] = useState(window.innerWidth)


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
            isTyping,
            setIsTyping,
            showChatBox,
            setShowChatBox,
            showMessageList,
            setShowMessageList,
            width,
            setWidth
        }}>
            {children}
        </ChatContext.Provider>
    )
}

export default ChatContext

