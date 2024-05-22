import Otp from "../../domain/otp";
import IOtp from "../../useCase/interface/IOtp";
import otpModel from "../database/StudentOtp";
class OtpRepo implements IOtp {
  createOtpCollection(email: string, otp: string) {
    otpModel.create({
      otp: otp,
      email: email,
    });
  }
  async getOtpByEmail(email: string): Promise<Otp | null> {
    try {
      let otp = await otpModel.findOne({ email: email });
      if (otp) {
        return otp;
      } else {
        return null;
      }
    } catch (error) {
      throw error;
    }
  }
 async  removeOtp(email: string) {
    try {
      await otpModel.deleteOne({
        email : email,
       
      })
    } catch (error) {
      throw error
    }
  }
}
export default OtpRepo;
