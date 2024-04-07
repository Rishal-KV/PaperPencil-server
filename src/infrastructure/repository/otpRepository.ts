
import Otp from "../../domain/otp";
import IOtp from "../../useCase/interface/IOtp";
import otpModel from "../database/StudentOtp";
class OtpRepo implements IOtp{
    createOtpCollection(email: string, otp: string) {
        otpModel.create({
            otp : otp,
            email : email
        })
    }
     async getOtpByEmail(email: string): Promise<Otp | null> {
         try {
            let otp = otpModel.findOne({email:email});
            return otp
         } catch (error) {
            throw error
         }
     }


}
export default OtpRepo
