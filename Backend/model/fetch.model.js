const mongoose = require("mongoose")


const FetchSchema = {
    method:String,
    requestApi:String,
    payload:Object,
    headers:Object,
    userId:String 
}
const Fetchmodel = mongoose.model("fetchDataCollection",FetchSchema)
module.exports={Fetchmodel}