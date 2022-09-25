//Single Chat:
//Gets opposite user first and last name from chat object.
export const getSenderName = (loggedUser, chat) => {
  const user = chat?.users;
  return chat?.users?.[0]._id !== loggedUser
    ? `${user?.[0].firstName} ${user?.[0].lastName}`
    : `${user?.[1].firstName} ${user?.[1].lastName}`;
};

//Single Chat:
//Gets opposite user profile
export const getSenderPic = (loggedUser, chat) => {
    const user = chat?.users;
    return chat?.users?.[0]._id !== loggedUser
      ? user?.[0]?.profilePic
      : user?.[1]?.profilePic
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
    return Math.round(elapsed / 1000) + " seconds ago";
  } else if (elapsed < msPerHour) {
    return Math.round(elapsed / msPerMinute) + " minutes ago";
  } else if (elapsed < msPerDay) {
    return Math.round(elapsed / msPerHour) + " hours ago";
  } else if (elapsed < msPerMonth) {
    return Math.round(elapsed / msPerDay) + " days ago";
  } else if (elapsed < msPerYear) {
    return Math.round(elapsed / msPerMonth) + " months ago";
  } else {
    return Math.round(elapsed / msPerYear) + " years ago";
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
    return Math.round(elapsed / msPerMinute) + " min";
  } else if (elapsed < msPerDay) {
    return Math.round(elapsed / msPerHour) + "h";
  } else if (elapsed < msPerMonth) {
    return Math.round(elapsed / msPerDay) + "d";
  } else if (elapsed < msPerYear) {
    return Math.round(elapsed / msPerMonth) + "m";
  } else {
    return Math.round(elapsed / msPerYear) + "yr";
  }
}


//Cut down message
export const messageBrief = (message) => {
  if (message?.length > 20) {
      return message.split('').slice(0,25).join('') + ".."
  } else {
    return message
  }
}