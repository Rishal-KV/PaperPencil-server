"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.instructorAuth = void 0;
const Jwt_1 = __importDefault(require("../utils/Jwt"));
const instructorRepo_1 = __importDefault(require("../repository/instructorRepo"));
let jwt = new Jwt_1.default();
let instructor = new instructorRepo_1.default();
const instructorAuth = async (req, res, next) => {
    try {
        let token = req.cookies.instructorToken;
        if (!token) {
            res.status(401).json({ status: false, message: "no token found!!!" });
        }
        else {
            let decodeToken = jwt.verifyToken(token);
            if (decodeToken) {
                if (decodeToken.role !== "instructor") {
                    return { status: false, message: "No access" };
                }
                let instructorData = await instructor.findInstructorById(decodeToken.id);
                if (instructor && instructorData?.is_blocked) {
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
exports.instructorAuth = instructorAuth;
exports.default = exports.instructorAuth;
