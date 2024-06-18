
import express from 'express';
import urlRouter from './routes/url.mjs';
import connectMongo  from './connection.mjs';
import URL from './models/url.mjs';


const app = express(); 
const PORT = 8080; 

connectMongo('mongodb://localhost:27017/url-shortner')


//MiddleWare using json here
app.use(express.json()); 
app.use('/url', urlRouter); 

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