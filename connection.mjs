
import mongoose from "mongoose";

const connectMongo = async(url) => {
    return await mongoose.connect(url).then(() => console.log('MongoDB connected Successfully!!'))
    .catch((err) => console.log(`MongoDB Error: ${err}`));
}

export default connectMongo