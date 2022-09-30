import { createContext, useState } from "react";


const ChatContext = createContext();

export function ChatProvider({ children }) {
    const [selectedChat, setSelectedChat] = useState()
    const [chats, setChats] = useState([])
    const [search, setSearch] = useState("")
    const [showModal, setShowModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [showUserProfile, setShowUserProfile] = useState(false)
    const [currentChat, setCurrentChat] = useState()
    const [userIsTyping, setUserIsTyping] = useState({});
    const [showChatBox, setShowChatBox] = useState(true)
    const [showMessageList, setShowMessageList] = useState(true)
    const [width, setWidth] = useState(window.innerWidth)
    const [profile, setProfile] = useState();

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
            userIsTyping,
            setUserIsTyping,
            showChatBox,
            setShowChatBox,
            showMessageList,
            setShowMessageList,
            width,
            setWidth,
            showEditModal,
            setShowEditModal,
            showUserProfile,
            setShowUserProfile,
            profile,
            setProfile
        }}>
            {children}
        </ChatContext.Provider>
    )
}

export default ChatContext

