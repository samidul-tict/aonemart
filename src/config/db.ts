import mongoose from "mongoose";
import morgan from "morgan";
//* Database connection *//
export const connection = () => {
    mongoose.connect('mongodb+srv://test.com', 
{useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
    .then(() => console.log('database connected'))
    .catch(err => console.log(err))
} 


