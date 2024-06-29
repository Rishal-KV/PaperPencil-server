"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const StudentOtp_1 = __importDefault(require("../database/StudentOtp"));
class OtpRepo {
    async createOtpCollection(email, otp) {
        try {
            const otpIsthere = await StudentOtp_1.default.findOne({ email: email });
            if (otpIsthere) {
                const otpFount = await StudentOtp_1.default.findOneAndUpdate({ email: email }, {
                    $set: {
                        otp: otp,
                    },
                });
                if (otpFount) {
                    return true;
                }
                else {
                    return false;
                }
            }
            else {
                const otpCreated = await StudentOtp_1.default.create({
                    otp: otp,
                    email: email,
                });
                if (otpCreated) {
                    return true;
                }
                else {
                    return false;
                }
            }
        }
        catch (error) {
            throw error;
        }
    }
    async getOtpByEmail(email) {
        try {
            const otp = await StudentOtp_1.default.findOne({ email: email });
            if (otp) {
                return otp;
            }
            else {
                return null;
            }
        }
        catch (error) {
            throw error;
        }
    }
    async removeOtp(email) {
        try {
            const removed = await StudentOtp_1.default.deleteOne({
                email: email,
            });
            if (removed) {
                return true;
            }
            else {
                return false;
            }
        }
        catch (error) {
            throw error;
        }
    }
}
exports.default = OtpRepo;
