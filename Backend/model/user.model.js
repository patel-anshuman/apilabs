const mongoose=require("mongoose")

const UserSchema = mongoose.Schema({
   name:{type:String,required:true},
   email:{type:String,required:true,unique:true},
   password:{type:String,required:true},
   role:{type:String,default:"User",enum:["User","Moderator"]}
})

const User=mongoose.model("User",UserSchema)

module.exports={User}