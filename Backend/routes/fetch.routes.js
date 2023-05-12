const express = require("express")
const fetchRouter = express.Router()
const {fetchapiroute,getAllDataofUser,getUserData}= require("../controller/fetch.controller")
fetchRouter.post("/fetch",fetchapiroute)
fetchRouter.get("/gethistory",getAllDataofUser)
fetchRouter.get("/getuserdata",getUserData)


module.exports = {fetchRouter}