import Otp from "../../domain/otp";
interface IOtp {
  createOtpCollection(email: string, otp: string);
  getOtpByEmail(email: string): Promise<Otp | null>;
  removeOtp(email: string);
}
export default IOtp;
