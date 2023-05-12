const express = require("express")
const fetchRouter = express.Router()
const {fetchapiroute,getAllDataofUser}= require("../controller/fetch.controller")
fetchRouter.post("/fetch",fetchapiroute)
fetchRouter.get("/gethistory",getAllDataofUser)


module.exports = {fetchRouter}