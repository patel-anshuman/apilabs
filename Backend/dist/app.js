"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const app = express();
const db_1 = __importDefault(require("./db"));
app.use(express.json());
const dotenv_1 = __importDefault(require("dotenv"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const express_session_1 = __importDefault(require("express-session"));
dotenv_1.default.config();
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const auth_1 = __importDefault(require("./middleware/auth"));
const api_route_1 = __importDefault(require("./routes/api.route"));
app.use((0, cookie_parser_1.default)());
const cors = require('cors');
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use((0, express_session_1.default)({
    secret: `${process.env.secretKeySession}`,
    resave: false,
    saveUninitialized: false,
}));
app.use("/user", user_route_1.default);
app.use(auth_1.default);
app.use("/api", api_route_1.default);
app.listen(process.env.port, () => {
    db_1.default.getInstance();
    console.log(`Server is connected on http://localhost:${process.env.port}`);
});
