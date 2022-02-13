import mongoose from "mongoose";
import morgan from "morgan";
//* Database connection *//
export const connection = () => {
    mongoose.connect('mongodb+srv://aonemart:aonemart_123@aonemart.zk6uk.mongodb.net/aonemart?retryWrites=true&w=majority', 
{useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
    .then(() => console.log('database connected'))
    .catch(err => console.log(err))
} 


