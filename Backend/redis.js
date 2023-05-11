const Redis=require("ioredis")
require("dotenv").config()
let configuration = {
    host:"redis-16831.c74.us-east-1-4.ec2.cloud.redislabs.com",
    port:16831,
    username:"default",
    password:process.env.Redis_Pass
 }
 
 const client =new Redis(configuration);///it is connected to cloud database
module.exports={client}
