import Otp from "../../domain/otp";
import IOtp from "../../useCase/interface/IOtp";
import otpModel from "../database/StudentOtp";
class OtpRepo implements IOtp {
  async createOtpCollection(email: string, otp: string): Promise<boolean> {
    try {
      const otpIsthere = await otpModel.findOne({ email: email });
      if (otpIsthere) {
        const otpFount = await otpModel.findOneAndUpdate(
          { email: email },
          {
            $set: {
              otp: otp,
            },
          }
        );
        if (otpFount) {
          return true;
        } else {
          return false;
        }
      } else {
        const otpCreated = await otpModel.create({
          otp: otp,
          email: email,
        });
        if (otpCreated) {
          return true;
        } else {
          return false;
        }
      }
    } catch (error) {
      throw error;
    }
  }
  async getOtpByEmail(email: string): Promise<Otp | null> {
    try {
      const otp = await otpModel.findOne({ email: email });
      if (otp) {
        return otp;
      } else {
        return null;
      }
    } catch (error) {
      throw error;
    }
  }
  async removeOtp(email: string): Promise<Boolean> {
    try {
      const removed = await otpModel.deleteOne({
        email: email,
      });
      if (removed) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw error;
    }
  }
}
export default OtpRepo;
