import mongoose from "mongoose";

const TestAPiSchema = new mongoose.Schema({
    method:{type:String,required:true},
    requestApi:{type:String,required:true},
    payload:{type:Object},
    headers:{type:Object},
    userId:{type:String,required:true}
})

interface TestAPiInterface{
    _id:mongoose.Types.ObjectId,
    method:string,
    requestApi:string,
    payload?:object,
    headers?:object,
    userId:string
}
const TestAPiModel = mongoose.model("ApiDetails" , TestAPiSchema)

export { TestAPiModel,TestAPiInterface}