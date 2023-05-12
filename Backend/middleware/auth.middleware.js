const jwt = require("jsonwebtoken")

const {Blacklist} = require("../model/blacklist.model.js")
const { client } = require("../redis.js")

const auth = async (req,res,next) =>{
    // const {NormalToken} = req?.cookies;
    const Token = await client.get("NormalToken") || await client.get("newNormalToken")
 
    if(!Token) return res.status(400).send({msg:"Please login"})
    
    jwt.verify(Token,process.env.JWT_ACCESS_TOKEN_SECRET_KEY,(err,decoded)=>{
    if(err){
        return res.status(401).send({msg:err.message})
     }else{
        req.userId = decoded.userId
        req.name = decoded.name
        req.email = decoded.email
        console.log(req.userId)
        next()
    }
    })
}

module.exports= {auth}