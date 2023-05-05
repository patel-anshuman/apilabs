const { Socket } = require("dgram")
const express = require("express")
const app = express()
const server = require("http").createServer(app)
const io = require("socket.io")(server)
const PORT = 8954
const {connection,project_model} = require("./DBandModel.js")


io.on("connection",(socket)=>{
    console.log("New user is connected")
    socket.on("MessengerName",async (TeamName)=>{
        const {Team_name,User_name} = TeamName
      const User_data = project_model({Team_Name:Team_name,Client_id:socket.io,Users:[{User_Name:User_name}]}) 
      await User_data.save()

        console.log(TeamName,socket.id)
    })
    socket.on("message",(msg)=>{
        // console.log(msg)
      socket.broadcast.emit("TeamMessage",{username:msg.username,message:msg.message})
    })
    socket.on("disconnect",()=>{
        console.log("User has been disconnected")
    })
})


server.listen(PORT,()=>{
    console.log(`Server is running at port ${PORT}`)
})