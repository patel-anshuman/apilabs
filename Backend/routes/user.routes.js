const {
    registerUser,
    login,logoutUser,newNormalToken
} =require("../controller/user.controller")


const UserRouter = require ("express").Router();

UserRouter.post("/register",registerUser)
UserRouter.post("/login",login)
UserRouter.get("/logout",logoutUser)
UserRouter.get("/refresh_token",newNormalToken)

module.exports = {UserRouter}