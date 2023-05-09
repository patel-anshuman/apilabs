const express = require("express")
const fetchRouter = express.Router()
const fetchapiroute = require("../controller/fetch.controller")
fetchRouter.post("/",fetchapiroute)

module.exports = {fetchRouter}
