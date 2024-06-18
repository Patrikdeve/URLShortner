
import express from 'express'
import {handleUserSignUp, handleUserLogin} from '../controller/user.mjs'

const router = express.Router(); 
//signup route and login route

router.post('/', handleUserSignUp)

router.get('/login', async(req, res) => {
    return res.render('login')
})


export default router;