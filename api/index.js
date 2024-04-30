import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import authRouter from './routes/auth.route.js';
import userRouter from './routes/user.route.js';
dotenv.config();

mongoose.connect(process.env.MONGO).then(() => {
    console.log("connected with mongodb");
}).catch((err) => {
    console.log(err);
});

const app = express();
app.use(express.json());

app.listen(3000,() =>{
    console.log('Server is running on port 3000!');
});


app.use("/api/user",userRouter);
app.use("/api/auth",authRouter);