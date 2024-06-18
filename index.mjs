
import express from 'express';
import urlRouter from './routes/url.mjs';
import connectMongo  from './connection.mjs';
import URL from './models/url.mjs';
import path from 'path';
import staticRoute from './routes/staticRouter.mjs'
import signupRoute from './routes/user.mjs'
import cookieParser from 'cookie-parser';
import {restrictToLoggedInUserOnly, checkAuth} from './middleware/auth.mjs';

const app = express(); 
const PORT = 8080; 

connectMongo('mongodb://localhost:27017/url-shortner')

app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))


//MiddleWare using json here
app.use(express.json()); 
app.use(express.urlencoded({extended: false}))
app.use(cookieParser()); //Now while authenticating we are using uuid trnasferred via cookie so using cookie parser



app.use('/', staticRoute); 
app.use('/url', restrictToLoggedInUserOnly, urlRouter); //We are adding middleware here as we want this accessed by logged in user only
app.use('/user', checkAuth, signupRoute); 



app.get('/test', async(req, res) => {
    
    const allUrls = await URL.find(); 
    return res.render("home", {
        urls:allUrls, 
    })
})



app.get('/:shortId', async(req, res) => {
    const shortId = req.params.shortId; 
    const entry = await URL.findOneAndUpdate({
        shortId
    }, {
        $push:{
            visitHistory: {
                timestamp: Date.now()
            },
        }
    })

    if(!entry) 
            return res.status(404).json({status: 'Unsuccessful', msg: 'No Such url Present'})
    res.redirect(entry.redirectUrl)
})

app.listen(8080, console.log('Server Started SuccessFully!!')); 