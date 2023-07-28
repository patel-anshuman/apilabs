"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllAPidata = exports.FetchController = void 0;
const api_model_1 = require("../models/api.model");
const axios_1 = __importDefault(require("axios"));
class FetchController {
    APifetchroute(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId, email, name, url, method, payload, headers } = req.body;
            try {
                let savefetchedData;
                let requestOptions;
                if (payload) {
                    savefetchedData = new api_model_1.TestAPiModel({
                        userId, requestApi: url, method, payload
                    });
                    requestOptions = {
                        method: method,
                        headers: Object.assign(Object.assign({}, headers), { "Content-Type": "application/json" }),
                        data: payload,
                        url: url
                    };
                }
                else {
                    savefetchedData = new api_model_1.TestAPiModel({
                        userId, requestApi: url, method
                    });
                    requestOptions = {
                        method: method,
                        headers: Object.assign(Object.assign({}, headers), { "Content-Type": "application/json" }),
                        url: url
                    };
                }
                yield savefetchedData.save();
                const response = yield (0, axios_1.default)(requestOptions);
                res.status(200).send({ data: response.data, name, email });
            }
            catch (error) {
                console.error(error);
                res.status(404).send({ "msg": error.msg });
            }
        });
    }
}
exports.FetchController = FetchController;
class getAllAPidata {
    GetallApisData(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield api_model_1.TestAPiModel.find({ userId: req.body.userId });
                res.status(200).send(data);
            }
            catch (error) {
                res.status(404).send({ "msg": error.msg });
            }
        });
    }
    GetLoginuserdata(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, name, userId } = req.body;
            res.status(200).send({ email, name, userId });
        });
    }
}
exports.getAllAPidata = getAllAPidata;
