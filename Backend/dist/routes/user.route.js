"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = __importDefault(require("../controller/user.controller"));
const UserRouter = express_1.default.Router();
const userController = new user_controller_1.default();
UserRouter.post("/register", userController.Register);
UserRouter.post("/login", userController.Login);
UserRouter.get("/logout", userController.Logout);
UserRouter.get("/newtoken", userController.GenrateNewToken);
exports.default = UserRouter;
