import mongoose, { model, Schema } from "mongoose";
import Otp from "../../domain/otp";

const studentOtpSchema = new Schema({
    otp: {
        type: String
    },
    email: {
        type: String
    },
    createdAt: { type: Date, expires: 60, default: Date.now }
})
studentOtpSchema.index({ createdAt: 1 }, { expireAfterSeconds: 0 })

const otpModel = model<Otp>('otp', studentOtpSchema)
export default otpModel                                                             