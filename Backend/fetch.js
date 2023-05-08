const express = require("express")
const app = express()
const cors = require("cors")
app.use(express.json())
app.use(cors())
const mongoose = require("mongoose")
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const connection = mongoose.connect("mongodb+srv://adesh:adeshtayde@cluster0.tebj3jv.mongodb.net/FetchProjectDB_Main?retryWrites=true&w=majority")

const FetchSchema = {
    UserName : String,
    method:String,
    requestApi:String,
    payload:Object,
    Userid:String 
}
const Fetchmodel = mongoose.model("fetchDataCollection",FetchSchema)

app.post("/",async(req,res)=>{
  let  {method,payload,url} = req.body;
  console.log(JSON.stringify(payload))
  console.log(req.body)
  try {
    
  
  if(method==="GET"){
fetch(url).then((res)=>res.json()).then((data)=>{
  console.log(data)
  res.status(200).send({msg:data})
}).catch((err)=>{
  console.log(err)
  res.send(400).send({msg:err.messaage})
})

  }else  if(method==="POST"){
    console.log("comming inside post")
    fetch(url,{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(payload)
    }
    ).then((res)=>res.json()).then((newdata)=>{
      console.log(newdata)
     
    res.status(200).send({msg:newdata})
    }).catch((err)=>{
      console.log(err)
      res.send(400).send({msg:error.messaage})
    })
  
  }else  if(method==="PUT"){
    try {
      const res = await fetch(url,{
        method:"PUT",
        headers:{
          "Content-Type":"application/json"
        },
        body:payload
      })
    const data = res.json()
    res.status(200).send({msg:data})
    } catch (error) {
      res.status(200).send({msg:error.messaage})
    }
  
  }else  if(method==="PATCH"){
    try {
      const res = await fetch(url,{
        method:"PATCH",
        headers:{
          "Content-Type":"application/json"
        },
        body:payload
      })
    const data = res.json()
    res.status(200).send({msg:data})
    } catch (error) {
      res.status(200).send({msg:error.messaage})
    }
  
  }
  else  if(method==="PATCH"){
    try {
      const res = await fetch(url,{
        method:"PATCH",
        headers:{
          "Content-Type":"application/json"
        },
        body:payload
      })
    const data = res.json()
    res.status(200).send({msg:data})
    } catch (error) {
      res.status(200).send({msg:error.messaage})
    }
  }
  else  if(method==="DELETE"){
    fetch(url,{
      method:"DELETE",
    }
    ).then((res)=>res.json()).then((newdata)=>{
      console.log(newdata)
     
    res.status(200).send({msg:newdata})
    }).catch((err)=>{
      console.log(err)
      res.send(400).send({msg:err.message})
    })
  
  }
} catch (error) {
    res.send(400).send({msg:error.messaage})
}

})

app.listen(8596,async()=>{
    try {
      await connection
      console.log("Server is  connected with MongoDB")
    } catch (error) {
      console.log("Server is not connected with MongoDB")
    }
    console.log("Server is connected at port number 8596")
})
