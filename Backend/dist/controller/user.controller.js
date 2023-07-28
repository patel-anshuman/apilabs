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
const user_model_1 = require("../models/user.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const redis_1 = require("../redis");
class UserController {
    Register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { password } = req.body;
                const hash = bcrypt_1.default.hashSync(password, 8);
                const newUser = new user_model_1.UserModel(Object.assign(Object.assign({}, req.body), { password: hash }));
                yield newUser.save();
                res.status(200).send({ msg: "Register successfully", user: newUser });
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
    }
    Login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const user = yield user_model_1.UserModel.findOne({ email });
                if (!user) {
                    res.status(401).json({ error: "Invalid credentials" });
                    return;
                }
                const isPasswordValid = bcrypt_1.default.compareSync(password, user.password);
                if (!isPasswordValid) {
                    res.status(401).json({ error: "Invalid Password" });
                }
                const token = jsonwebtoken_1.default.sign({
                    userId: user._id,
                    name: user.name,
                    email: user.email,
                }, `${process.env.JWT_ACCESS_TOKEN_SECRET_KEY}`, { expiresIn: "1h" });
                const refresh = jsonwebtoken_1.default.sign({
                    userId: user._id,
                    name: user.name,
                    email: user.email,
                }, `${process.env.JWT_REFRESH_TOKEN_SECRET_KEY}`, { expiresIn: "2h" });
                redis_1.client.mset("token", token, "EX", 3600, "refresh", refresh, "EX", 7200);
                console.log(yield redis_1.client.get("token"), yield redis_1.client.get("refresh")); //checking
                res.status(200).send({ msg: "Login Successfully", token, refresh });
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
    }
    Logout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                redis_1.client.del(["token", "refresh"]);
                console.log(yield redis_1.client.get("token"), yield redis_1.client.get("refresh")); //checking
                res.status(201).send({ "msg": "Logout Succesfully" });
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
    }
    GenrateNewToken(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const refresh = yield redis_1.client.get("refresh");
            try {
                if (refresh === null) {
                    console.log("HereBlacklist");
                    res.status(400).send({ msg: "Please login" });
                }
                jsonwebtoken_1.default.verify(refresh, `${process.env.JWT_REFRESH_TOKEN_SECRET_KEY}`, (err, decoded) => {
                    if (decoded) {
                        const newToken = jsonwebtoken_1.default.sign({ userId: decoded._id, email: decoded.email, }, `${process.env.JWT_ACCESS_TOKEN_SECRET_KEY}`, { expiresIn: "1h" });
                        redis_1.client.set("token", newToken, "EX", 3600);
                    }
                });
                console.log(yield redis_1.client.get("token"), yield redis_1.client.get("refresh")); ///checking
                res.status(200).send({ "msg": "New token has been set" });
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
    }
}
exports.default = UserController;
