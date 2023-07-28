import { FetchController,getAllAPidata } from "../controller/api.controller";

const APifetchercontroller = new FetchController()
const getalldata = new getAllAPidata()
import express from "express"
const ApiRouter = express.Router()

ApiRouter.post("/test",APifetchercontroller.APifetchroute)
ApiRouter.get("/getallAPisdata",getalldata.GetallApisData)
ApiRouter.get("/loginUserdata",getalldata.GetLoginuserdata)
export default ApiRouter