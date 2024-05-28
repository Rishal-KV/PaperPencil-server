"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
class Bcrypt {
    async hashPass(password) {
        try {
            console.log(password);
            let bcryptedPassword = bcrypt_1.default.hash(password, 10);
            return bcryptedPassword;
        }
        catch (error) {
            console.log(error);
        }
    }
    async encryptPass(password, hashpass) {
        try {
            let verifiedPass = bcrypt_1.default.compare(password, hashpass);
            return verifiedPass;
        }
        catch (error) {
            console.log(error);
        }
    }
}
exports.default = Bcrypt;
