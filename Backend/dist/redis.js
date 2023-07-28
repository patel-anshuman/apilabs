"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const Redis = require("ioredis");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
let configuration = {
    host: "redis-19612.c74.us-east-1-4.ec2.cloud.redislabs.com",
    port: 19612,
    username: "default",
    password: `${process.env.Redis_Pass}`
};
const client = new Redis(configuration); ///it is connected to cloud database
exports.client = client;
