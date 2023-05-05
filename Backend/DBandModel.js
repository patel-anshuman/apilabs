const mongoose = require("mongoose")
require("dotenv").config()
const connection = mongoose.connect(process.env.mongourl)
const NestedSchema = new mongoose.Schema({
    User_Name: { type: String },
    User_requests:Object
  });
const projetc_Schema = mongoose.Schema({
    Team_Name : {type:String},
    Client_id : Number,
    Users:[NestedSchema]
})

const project_model = mongoose.model("Project_User_data",projetc_Schema)

module.exports={connection,project_model}