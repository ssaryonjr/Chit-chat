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

    /*
    // Step 1 DONE

    // BEFORE
    const rooms = {
      "room_abc": false,
    };

            const room_id = "room_def"
            function upddateRooms(previousMap) {
                  const updatedMap = {
                      ...previousMap,
                      [room_id]: true,
                  };
                  return updatedMap;
           }


    // AFTER
     rooms = {
      "room_abc": false,
      "room_def": true,
    };


    rooms   {}

    "typing message" room_id="abc"

    rooms  {"abc": true}

    "typing message" room_id="def"

    rooms  {"abc": true, "def": true}

    "stop typing message" room_id="abc"

    rooms  {"abc": false, "def": true}










    // Step: 2 DONE
    // when we get typing message:
    rooms["new_chatroom_id"] = true;

    // Step: 3  DONE
    // when we get "stop typing" message:
    rooms["new_chatroom_id"] = false;

    // Step 4:
    // Read display
    if (rooms[activeRoomId] === true) { display indicator }

    */

    const [userIsTyping, setUserIsTyping] = useState({});

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
        }}>
            {children}
        </ChatContext.Provider>
    )
}

export default ChatContext
