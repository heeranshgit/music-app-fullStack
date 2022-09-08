import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoute from "./routes/auth.js";

const app = express();
dotenv.config();
const PORT = process.env.PORT||1234
app.use(bodyParser.json());
app.use(cors({ //not responding to localhost:3000 with just app.use(cors). and enter the port where you want to send the response
    origin: ['http://localhost:3000'],
    credentials: true
}));
app.use(express.json());

const connect = async () => {
    try{
        await mongoose.connect(process.env.MONGO);
        console.log('connected to mongoDB');
    } catch(err){
        throw err;
    }
}

mongoose.connection.on("disconnected", ()=>{
    console.log('mongoDB is disconnected');
})

app.use('/', authRoute);

app.listen(PORT, () => { //can put the port number in constants or .env
    connect();
    console.log('app is listening at port 1234');
})