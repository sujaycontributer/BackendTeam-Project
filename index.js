require('dotenv').config();
const express = require('express');
const { mongoose } = require('mongoose');
const { userRouter } = require('./routes/user');


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/api/v1/user', userRouter); // api =>  http://localhost:3000//api/v1/user
const port = process.env.PORT || 3000;


async function BackendStart() {
    try{
        await  mongoose.connect(process.env.MONGODB_URL);
        app.listen(port);
        console.log("Backend is running on the port 3000");
        
    } catch(err){
        console.log(err);
        
    }
}

BackendStart();



