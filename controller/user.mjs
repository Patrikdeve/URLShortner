
import User from '../models/user.mjs'
import { v4 as uuidv4 } from 'uuid';
import { setUser, getUser } from '../services/auth.mjs';

const handleUserSignUp = async(req, res) => {
    const{name, email, password} = req.body; 

    await User.create({
        name: name, 
        email: email, 
        password: password
    })

    return res.redirect('/'); 
}
const handleUserLogin = async(req, res) => {
    const{ email, password} = req.body; 

    const entry = await User.findOne({email, password}); 

    if(!entry) 
        return res.render('login', 
            {status: 'Unsuccesfull' , msg: `No Such User Present`}
        )
    
    
     const token = setUser(entry)
    res.cookie('uid', token); 
    return res.redirect('/'); 
}

export  {handleUserSignUp, handleUserLogin}