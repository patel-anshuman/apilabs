const mongoose=require("mongoose")
require("dotenv").config()

const UserSchema = mongoose.Schema({
   name:{type:String,required:true},
   email:{type:String,unique:true,required:true},
   password:{type:String,required:true}
})

const User=mongoose.model("User",UserSchema)

module.exports={User}