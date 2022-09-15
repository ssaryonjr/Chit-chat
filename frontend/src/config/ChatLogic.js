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

