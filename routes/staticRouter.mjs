import express from "express";
import { handleUserLogin } from "../controller/user.mjs";

const router = express.Router();

router.get('/', async(req, res) => {
    return res.render("home")
})

router.get('/signup', async(req, res) => {
    return res.render("signup")
})

router.post('/login', handleUserLogin).get('/login', async(req, res) => {
    return res.render('login'); 
})

export default router; 