
import mongoose from "mongoose";

const connectDb =(url) =>{
    return mongoose.connect(url)    

}

export default connectDb