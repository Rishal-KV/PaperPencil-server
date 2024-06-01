"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GenerateOTP {
    generateOTP() {
        const otp = Math.floor(1000 + Math.random() * 9000);
        return otp.toString();
    }
}
exports.default = GenerateOTP;
