"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const studentOtpSchema = new mongoose_1.Schema({
    otp: {
        type: String
    },
    email: {
        type: String
    },
    createdAt: { type: Date, default: Date.now }
});
const otpModel = (0, mongoose_1.model)('otp', studentOtpSchema);
exports.default = otpModel;
