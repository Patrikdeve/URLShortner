
const UserSessionMap = new Map(); 

const setUser = (id, user) => {
    UserSessionMap.set(id, user); 
}

const getUser = (id) => {
    return UserSessionMap.get(id); 
}

export {setUser, getUser}