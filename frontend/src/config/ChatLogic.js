//Single Chat:
//Gets opposite user first and last name from chat object.
export const getSenderName = (loggedUser, chat) => {
  const [user1, user2] = chat?.users;
  return chat?.users?.[0]._id !== loggedUser
    ? `${user1?.firstName} ${user1?.lastName}`
    : `${user2?.firstName} ${user2?.lastName}`;
};

//Single Chat:
//Gets opposite user profile
export const getSenderPic = (loggedUser, chat) => {
    const user = chat?.users;
    return chat?.users?.[0]._id !== loggedUser
      ? user?.[0]?.profilePic
      : user?.[1]?.profilePic
}

//Get opposite user !logged in Id
export const getUserId = (loggedUser, chat) => {
  const [user1, user2] = chat?.users
  return chat?.users?.[0]?._id !== loggedUser
    ? user1?._id
    : user2?._id

}

//Group Chat:
//Gets first user pic from group.
export const getFirstGroupPic = (loggedUser, chat) => {
    const groupMembers = chat?.users.filter(member => member._id !== loggedUser)
    return groupMembers?.[0]?.profilePic
}

//Group Chat:
//Gets second user pic from group.
export const getSecondGroupPic = (loggedUser, chat) => {
    const groupMembers = chat?.users.filter(member => member._id !== loggedUser)
    return groupMembers?.[1]?.profilePic
}

export const isSameSender = (messages, m, i, userId) => {
  return (
    i < messages.length - 1 &&
    (messages[i + 1]?.sender?._id !== m?.sender?._id ||
      messages[i + 1]?.sender?._id === undefined) &&
    messages[i]?.sender?._id !== userId
  );
};

//Gets ID of who sent the last message
export const isLastMessage = (messages, i, userId) => {
  return (
    i === messages.length - 1 &&
    messages[messages.length - 1]?.sender?._id !== userId &&
    messages[messages.length - 1]?.sender?._id
  );
};


//Timestamps for messages
export const timeDifference = (current, previous) => {
  const msPerMinute = 60 * 1000;
  const msPerHour = msPerMinute * 60;
  const msPerDay = msPerHour * 24;
  const msPerMonth = msPerDay * 30;
  const msPerYear = msPerDay * 365;

  const elapsed = current - previous;

  if (elapsed < msPerMinute) {
    let time = Math.round(elapsed / 1000);
    return time === 1 ? time + " second ago" : time + ' seconds ago'

  } else if (elapsed < msPerHour) {
    let time = Math.round(elapsed / msPerMinute);
    return time === 1 ? time + " minute ago" : time + ' minutes ago'

  } else if (elapsed < msPerDay) {
    let time = Math.round(elapsed / msPerHour);
    return time === 1 ? time + " hour ago" : time + ' hours ago'
    
  } else if (elapsed < msPerMonth) {
    let time = Math.round(elapsed / msPerDay);
    return time === 1 ? time + " day ago" : time + ' days ago'

  } else if (elapsed < msPerYear) {
    let time = Math.round(elapsed / msPerMonth);
    return time === 1 ? time + " month ago" : time + ' months ago'
  } else {
    let time = Math.round(elapsed / msPerYear);
    return time === 1 ? time + " year ago" : time + ' years ago'
  }
}

//Timestamp for chat sidebar brief
export const latestMessageTime = (current, previous) => {

  const msPerMinute = 60 * 1000;
  const msPerHour = msPerMinute * 60;
  const msPerDay = msPerHour * 24;
  const msPerMonth = msPerDay * 30;
  const msPerYear = msPerDay * 365;

  const elapsed = current - previous;

  if (elapsed < msPerMinute) {
    return Math.round(elapsed / 1000) + "s";
  } else if (elapsed < msPerHour) {
    return Math.round(elapsed / msPerMinute) + "m";
  } else if (elapsed < msPerDay) {
    return Math.round(elapsed / msPerHour) + "h";
  } else if (elapsed < msPerMonth) {
    return Math.round(elapsed / msPerDay) + "d";
  } else if (elapsed < msPerYear) {
    return Math.round(elapsed / msPerMonth) + "m";
  } else if (elapsed > msPerYear) {
    return Math.round(elapsed / msPerYear) + "yr";
  } else {
    return ''
  }
}


//Cut down message
export const messageBrief = (message) => {
  if (message?.length > 25) {
      return message.split('').slice(0,25).join('') + ".."
  } else {
    return message
  }
}

//Find admin account
export const findAdminChat = (chatList) => {
  const adminId = "6335195dd79952cd9e023a94";

  const singlechats = chatList?.filter(chat => (chat?.users?.length === 2))
  const adminChat = singlechats?.filter(chat => chat?.users?.[0]?._id === adminId || chat?.users?.[1]?._id === adminId)
  
  return adminChat?.[0]
}

//Shows if user is currently active or when their last time active was inside of the chat page.
export const getUserStatus = (loggedUser, chat) => {
  const oppositeUser =
    chat?.users?.[0]._id !== loggedUser ? chat?.users?.[0] : chat?.users?.[1];
  
  return oppositeUser?.userStatus === 'offline'
    ? `Active ${timeDifference(new Date(), new Date(oppositeUser?.lastActive))}`
    : 'Online Now'
}

//Shows user status if they're currently online or last time they were.
export const getUserStatusForList = (user) => {
  return user?.userStatus === "offline"
    ? `Active ${timeDifference(new Date(), new Date(user?.lastActive))}`
    : "Online Now";
}


export const showStatusIcon = (loggedUser, chat) => {
  const oppositeUser = chat?.users?.[0]._id !== loggedUser ? chat?.users?.[0] : chat?.users?.[1];
  return oppositeUser?.userStatus === 'online'
    ? true
    : false
}

//Check if user is verified
export const checkIfVerified = (loggedUser, chat) => {
  const oppositeUser =
    chat?.users?.[0]._id !== loggedUser ? chat?.users?.[0] : chat?.users?.[1];
  return oppositeUser?.verified
}