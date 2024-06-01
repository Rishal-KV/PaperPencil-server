"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, "../../.env") });
class Jwt {
    secretKey;
    constructor() {
        // console.log('Initializing Jwt class...');
        // console.log('process.env.jwt_secret:', process.env);
        this.secretKey = process.env.jwt_secret || "";
        // console.log('this.secretKey:', this.secretKey);
    }
    createToken(id, role) {
        try {
            let payLoad = { id, role };
            const token = (0, jsonwebtoken_1.sign)(payLoad, this.secretKey, { expiresIn: "2d" });
            return token;
        }
        catch (error) {
            console.error("Error creating token:", error);
            throw error;
        }
    }
    verifyToken(token) {
        try {
            const decoded = (0, jsonwebtoken_1.verify)(token, this.secretKey);
            return decoded;
        }
        catch (error) {
            console.error("Error verifying token:", error);
            return null;
        }
    }
}
exports.default = Jwt;
