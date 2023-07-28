"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestAPiModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const TestAPiSchema = new mongoose_1.default.Schema({
    method: { type: String, required: true },
    requestApi: { type: String, required: true },
    payload: { type: Object },
    headers: { type: Object },
    userId: { type: String, required: true }
});
const TestAPiModel = mongoose_1.default.model("ApiDetails", TestAPiSchema);
exports.TestAPiModel = TestAPiModel;
