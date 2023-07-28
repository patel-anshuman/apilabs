"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const api_controller_1 = require("../controller/api.controller");
const APifetchercontroller = new api_controller_1.FetchController();
const getalldata = new api_controller_1.getAllAPidata();
const express_1 = __importDefault(require("express"));
const ApiRouter = express_1.default.Router();
ApiRouter.post("/test", APifetchercontroller.APifetchroute);
ApiRouter.get("/getallAPisdata", getalldata.GetallApisData);
ApiRouter.get("/loginUserdata", getalldata.GetLoginuserdata);
exports.default = ApiRouter;
