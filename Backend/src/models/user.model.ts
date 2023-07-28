import mongoose from "mongoose";

const UserSchema =new mongoose.Schema({
     name:{type:String,required:true},
     email:{type:String,required:true,unique:true},
     password:{type:String,required:true}
})

 interface UserInterface{
     _id:mongoose.Types.ObjectId
     name:string,
     email:string,
     password:string
}
const UserModel = mongoose.model("User",UserSchema)

export { UserModel,UserInterface}