
import mongoose, { Mongoose } from "mongoose";

const urlSchema = new mongoose.Schema({

    shortId: {
        type: String, 
        required: true, 
        unique: true
    }, 
    redirectUrl: {
        type: String, 
        required: true, 
        unique: true
    }, 
    visitHistory: [{
        timestamps: {
            type: Number
        }
    }], 
    createdBy: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "users"
    }

}, {timestamps: true})

const URL = mongoose.model('url', urlSchema); 
export default URL; 