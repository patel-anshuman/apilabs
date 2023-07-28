const express = require("express")
const app = express()
import Database from "./db"
app.use(express.json())
import dotenv from 'dotenv';
import UserRouter from "./routes/user.route";
import session,{SessionOptions} from "express-session" 
import { Request,Response,NextFunction } from "express";
dotenv.config();
import cookieParser from 'cookie-parser';
import auth from "./middleware/auth";
import ApiRouter from "./routes/api.route";
app.use(cookieParser());
const cors = require('cors')
app.use(cors())
app.use(express.urlencoded({ extended: true }));


app.use("/user",UserRouter)
app.use(auth)
app.use("/api",ApiRouter)

app.listen(process.env.port,()=>{
    Database.getInstance()
    console.log(`Server is connected on http://localhost:${process.env.port}`)
})


