const Redis=require("ioredis")
import dotenv from 'dotenv';
dotenv.config();
let configuration = {
    host:"redis-19612.c74.us-east-1-4.ec2.cloud.redislabs.com",
    port:19612,
    username:"default",
    password:`${process.env.Redis_Pass}`
 }
 
 const client =new Redis(configuration);///it is connected to cloud database

 export {client}
