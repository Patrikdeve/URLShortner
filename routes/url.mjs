
// const express = require('express')
// const {handlePostUrl} = require('../controller/url.mjs')
// const router = express.Router(); 



import express from 'express';
import {handlePostUrl, handleAnalytics} from '../controller/url.mjs';


const router = express.Router();

router.post('/', handlePostUrl);
router.get('/analytics/:shortId', handleAnalytics); 

export default router;














