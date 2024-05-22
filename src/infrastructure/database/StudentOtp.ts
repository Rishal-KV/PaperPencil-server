import mongoose, { model, Schema } from "mongoose";
import Otp from "../../domain/otp";

const studentOtpSchema = new Schema({
    otp: {
        type: String
    },
    email: {
        type: String
    },
    createdAt: { type: Date,  default: Date.now }
})



const otpModel = model<Otp>('otp', studentOtpSchema)
export default otpModel                                                             