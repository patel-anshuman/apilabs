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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const redis_1 = require("../redis");
dotenv_1.default.config();
const auth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = yield redis_1.client.get("token");
    console.log(token);
    if (token !== null) {
        jsonwebtoken_1.default.verify(token, `${process.env.JWT_ACCESS_TOKEN_SECRET_KEY}`, function (err, decoded) {
            if (decoded) {
                req.body.userId = decoded.userId;
                req.body.name = decoded.name;
                req.body.email = decoded.email;
                // console.log(decoded)
                next();
            }
            else if (err) {
                res.status(400).send({ err: err.msg });
            }
        });
    }
    else {
        res.status(400).send({ "msg": "Please Login" });
    }
});
exports.default = auth;
