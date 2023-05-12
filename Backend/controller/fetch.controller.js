
const {Fetchmodel} = require("../model/fetch.model")
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));


const fetchapiroute=async(req,res)=>{
    let  {method,payload,url} = req.body;
    
    console.log(JSON.stringify(payload))
    console.log(req.body)
    try {
      
    // ///GET
    if(method==="GET"){
        const saveFetchedData =new Fetchmodel({userId:req.userId,requestApi:url,method:method})
        await saveFetchedData.save()
        fetch(url,{
    headers:{
        "Content-Type":"application/json",
    }
  }).then((res)=>res.json()).then((data)=>{
    console.log(data)
    res.status(200).send({msg:data,name:req.name,email:req.email})
  }).catch((err)=>{
    console.log(err)
    res.send(400).send({msg:err.messaage})
  })
  
    }
    ///POST
    else  if(method==="POST"){
      const saveFetchedData =new Fetchmodel({userId:req.userId,requestApi:url,method:method})
        await saveFetchedData.save()
      console.log("comming inside post")
      fetch(url,{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify(payload)
      }
      ).then((res)=>res.json()).then((newdata)=>{
        console.log(newdata)
       
        res.status(200).send({msg:newdata,name:req.name,email:req.email})
      }).catch((err)=>{
        console.log(err)
        res.send(400).send({msg:err.messaage})
      })
    }
    //PUT
    else  if(method==="PUT"){
      const saveFetchedData =new Fetchmodel({userId:req.userId,requestApi:url,method:method})
        await saveFetchedData.save()
        fetch(url,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(payload)
          }
          ).then((res)=>res.json()).then((newdata)=>{
            console.log(newdata)
           
            res.status(200).send({msg:newdata,name:req.name,email:req.email})
          }).catch((err)=>{
            console.log(err)
            res.send(400).send({msg:err.messaage})
          })
    
    }
    ///PATCH
    else  if(method==="PATCH"){
      const saveFetchedData =new Fetchmodel({userId:req.userId,requestApi:url,method:method})
        await saveFetchedData.save()
        fetch(url,{
            method:"PATCH",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify(payload)
          }
          ).then((res)=>res.json()).then((newdata)=>{
            console.log(newdata)
           
            res.status(200).send({msg:newdata,name:req.name,email:req.email})
          }).catch((err)=>{
            console.log(err)
            res.send(400).send({msg:err.messaage})
          })
    }
    ///DELETE
    else  if(method==="DELETE"){
      const saveFetchedData =new Fetchmodel({userId:req.userId,requestApi:url,method:method})
        await saveFetchedData.save()
      fetch(url,{
        method:"DELETE",
        headers:{
            "Content-Type":"application/json",
        }
      }
      ).then((res)=>res.json()).then((newdata)=>{
        console.log(newdata)
       
      res.status(200).send({msg:newdata,name:req.name,email:req.email})
      }).catch((err)=>{
        console.log(err)
        res.send(400).send({msg:err.message})
      })
    
    }
  } catch (error) {
      res.send(400).send({msg:error.messaage})
  }
  
  }

const getAllDataofUser = async (req,res) =>{
  try {
   const AllUserdata = await Fetchmodel.find({userId:req.userId})
   res.status(200).send({"msg":AllUserdata})
  } catch (error) {
    res.send(400).send({msg:error.messaage})
  }
}

const getUserData = (req,res) =>{
  res.status(200).send({name:req.name,email:req.email})
}
  module.exports={fetchapiroute,getAllDataofUser,getUserData}