import { getUser } from "../services/auth.mjs";


const restrictToLoggedInUserOnly = async(req, res, next) => {


    const uuid = req.cookies.uid; 

    if(!uuid) 
        return res.redirect('/login'); 

    const user = getUser(uuid); 
    
    if(!user) 
        return res.redirect('/login');
    
    req.user = user; 
    next() 
}

const checkAuth = async(req, res, next) => {
    
    const uuid = req.cookies.uid; 
    const user = getUser(uuid); 
    
    req.user = user; 
    next() 
}

export  {restrictToLoggedInUserOnly, checkAuth}; 