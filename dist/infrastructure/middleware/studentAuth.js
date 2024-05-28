"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentAuth = void 0;
const Jwt_1 = __importDefault(require("../utils/Jwt"));
const studentRepo_1 = __importDefault(require("../repository/studentRepo"));
let jwt = new Jwt_1.default();
let student = new studentRepo_1.default();
const studentAuth = async (req, res, next) => {
    try {
        let token = req.cookies.studentToken;
        if (!token) {
            res.status(401).json({ status: false, message: "no token found!!!" });
        }
        else {
            let decodeToken = jwt.verifyToken(token);
            if (decodeToken) {
                if (decodeToken.role !== "student") {
                    return { status: false, message: "No access" };
                }
                let studentData = await student.getStudentById(decodeToken.id);
                if (studentData && studentData?.is_blocked) {
                    res.status(401).json({ blocked: true, role: decodeToken.role });
                }
                else {
                    next();
                }
            }
        }
    }
    catch (error) {
        throw error;
    }
};
exports.studentAuth = studentAuth;
exports.default = exports.studentAuth;
