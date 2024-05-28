import Otp from "../../domain/otp";
interface IOtp {
  createOtpCollection(email: string, otp: string):Promise<Boolean>;
  getOtpByEmail(email: string): Promise<Otp | null>;
  removeOtp(email: string):Promise<Boolean>;
}
export default IOtp;
