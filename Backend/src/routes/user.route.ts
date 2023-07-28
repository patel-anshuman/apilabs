import express from "express"
import UserController from "../controller/user.controller"
const UserRouter = express.Router()
const userController = new UserController()
UserRouter.post("/register",userController.Register)
UserRouter.post("/login",userController.Login)
UserRouter.get("/logout",userController.Logout)
UserRouter.get("/newtoken",userController.GenrateNewToken)
export default UserRouter
