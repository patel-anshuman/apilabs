const mongoose=require("mongoose")
require("dotenv").config()

const UserSchema = mongoose.Schema({
   email:{type:String,},
   password:{type:String},
})

const User=mongoose.model("User",UserSchema)

module.exports={User}