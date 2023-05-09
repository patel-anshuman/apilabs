const jwt = require("jsonwebtoken")

const {Blacklist} = require("../model/blacklist.model.js")


const auth = async (req,res,next) =>{
    // const {NormalToken} = req?.cookies;c
    const {NormalToken} = req.cookies
    if(!NormalToken) return res.status(400).send({msg:"Please login"})
    const iSblacklisted = await Blacklist.findOne({token:NormalToken})
if(iSblacklisted){
     return res.status(400).send({msg:"Please login"})
}
    jwt.verify(NormalToken,process.env.JWT_REFRESH_TOKEN_SECRET_KEY,(err,decoded)=>{
    if(err){
        return res.status(401).send({msg:err.message})
     }else{
        req.userId = decoded.userId
        console.log(req.userId)
        next()
    }
    })


}

module.exports= {auth}