"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_session_1 = __importDefault(require("express-session"));
const SessionMiddleware = (req, res, next) => {
    const sessionOptions = {
        secret: 'your_secret_key',
        resave: false,
        saveUninitialized: false,
    };
    // Check the session key and set maxAge accordingly
    if (req.sessionID === 'normaltoken') {
        sessionOptions.cookie = {
            maxAge: 180000, // 1 minute for the 'special_session'
        };
    }
    else if (req.sessionID === "refreshtoken") {
        sessionOptions.cookie = {
            maxAge: 3600000, // 1 hour for other sessions
        };
    }
    (0, express_session_1.default)(sessionOptions)(req, res, next);
};
exports.default = SessionMiddleware;
