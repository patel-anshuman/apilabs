const { User } = require("../model/user.model")
const { Blacklist } = require("../model/blacklist.model")
const {client} = require("../redis")

const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const registerUser= async (req,res) =>{
    try {
        const {password} = req.body
        
        const hashedpassword = bcrypt.hashSync(password,5);
        const newUser = new User({...req.body,password:hashedpassword})
        await newUser.save();
        res.status(200).send({msg:"Register successfully",user:newUser});
    } catch (error) {
        console.log("error:Register error")
        res.status(400).send({msg:error.message})
    }
}

const login = async (req,res) =>{
    try {
        const {email,password} = req.body
        const user=await User.findOne({email})
   const   ischeck = bcrypt.compareSync(password, user.password);
    // true
    if(!user){
        res.status(400).send({msg:"Invalid Credentials"})  
    }
    if(!ischeck){
        res.status(400).send({msg:"Invalid Credentials"})
    }

    const NormalToken = jwt.sign(
        {userId:user._id,name:user.name,email:user.email},
        process.env.JWT_ACCESS_TOKEN_SECRET_KEY,
        {expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRY}
    )
    const RefreshToken = jwt.sign(
        {userId:user._id,name:user.name,email:user.email},
        process.env.JWT_REFRESH_TOKEN_SECRET_KEY,
        {expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRY}
    );
    client.mset("NormalToken",NormalToken,"EX",60*process.env.JWT_ACCESS_TOKEN_EXPIRY,"RefreshToken",RefreshToken,"EX",60*process.env.JWT_REFRESH_TOKEN_EXPIRY)
    res.status(200).send({msg:"Login success","name":user.name,"email":user.email})
}

     catch (error) {
        console.log("error:Login error")
        res.status(400).send({msg:error.message})
    }
}

const logoutUser = async (req,res) => {
    try {
        const NormalToken=await client.get("NormalToken")
        
        const RefreshToken=await client.get("RefreshToken")
        
        if(!NormalToken || !RefreshToken){
            res.status(400).send({msg:"Unauthorized"})
        }

    //     const blacklistNormalToken= new Blacklist({token:NormalToken})
    //     const blacklistRefreshToken= new Blacklist({token:RefreshToken})

    //     await blacklistNormalToken.save()
    //     await blacklistRefreshToken.save()
    //  res.clearCookie("NormalToken")
    //  res.clearCookie("RefreshToken")
    console.log(NormalToken,RefreshToken)
     client.del("NormalToken","RefreshToken")
    console.log(await client.mget("NormalToken","RefreshToken"))
     res.status(200).send({msg:"Logout succesfully"})
    } catch (error) {
         console.log("error:logout error")
        res.status(400).send({msg:error.message})
    }
}



const newNormalToken = async (req,res) =>{
    try {
       
       const RefreshToken= await client.get("RefreshToken")
      
        
        if(!RefreshToken){
            console.log("HereBlacklist")
            res.status(400).send({msg:"Please login"})
        }
        const isTokenvalid = jwt.verify(RefreshToken,process.env.JWT_REFRESH_TOKEN_SECRET_KEY)
        console.log(isTokenvalid.userId)
        if(!isTokenvalid){
            console.log("HereUser")
            res.status(400).send({msg:"Please login"})
        }
        const newNormaltoken = 
         jwt.sign(
                {userId:isTokenvalid._id,role:isTokenvalid.role},
                process.env.JWT_ACCESS_TOKEN_SECRET_KEY,
                {expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRY}
        );
        client.set("newNormalToken",newNormaltoken)
        res.status(200).send({msg:"Token generated" ,newNormaltoken})
    } catch (error) {
        console.log("error:NewNormalToken error")
        res.status(400).send({msg:error.message})
    }


}


module.exports={
    registerUser,
    login,logoutUser,newNormalToken
}