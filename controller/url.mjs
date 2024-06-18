
//Now due to new update the require is no longer supported in mjs files need to use the import rather
import shortid from '../functions/shortId.mjs';
import URL from '../models/url.mjs'
// const URL = require('../models/url')

const handlePostUrl = async(req, res) => {

    const body = req.body; 
    if(!body.url) 
        return res.status(400).json({ status: 'Unsuccessful', msg: 'Please Provide the valid url'}); 

    const shortId = shortid(8)

    await URL.create({
        shortId: shortId, 
        redirectUrl: body.url, 
        visitHistory: []
    })

    return res.status(201).json({status: 'Successful', 
        msg: `Short Id: ${shortId}`
    })

}

const handleAnalytics = async(req, res) => {
    const shortId = req.params.shortId; 
    const entry = await URL.findOne({shortId}); 
    if(!entry) 
        return res.status(404).json({status: 'Unsucess', msg:'No Such entry Found'});

    return res.status(200).json({
        totalClicks: entry.visitHistory.length, 
        analytics: entry.visitHistory
    })
}

export  {handlePostUrl, handleAnalytics}; 