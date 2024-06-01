"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminAuth = void 0;
const Jwt_1 = __importDefault(require("../utils/Jwt"));
let jwt = new Jwt_1.default();
const adminAuth = async (req, res, next) => {
    try {
        let token = req.cookies.admin;
        if (!token) {
            res.status(401).json({ status: true, message: "no token found" });
        }
        else {
            let decodeToken = jwt.verifyToken(token);
            if (decodeToken && decodeToken.role !== "admin") {
                res.json({ status: false, message: "no access" });
            }
            else {
                next();
            }
        }
    }
    catch (error) {
        console.log(error);
    }
};
exports.adminAuth = adminAuth;
