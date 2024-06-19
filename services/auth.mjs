
import jwt from 'jsonwebtoken'; 

const secret = "secret@1234"; //The coded token can be only changed or mutated by one who have this secret key


const setUser = (user) => {
    return jwt.sign({
        id: user._id, 
        email: user.email
    }, secret); 
}

const getUser = (token) => {
    return jwt.verify(token, secret)
}

export {setUser, getUser}