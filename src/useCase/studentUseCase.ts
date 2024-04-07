import IStudentRepo from "./interface/IStudentRepo";
import student from "../domain/student";
import GenerateOTP from "../infrastructure/utils/generateOtp";
import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, ".env") });
import jwt from "jsonwebtoken";
import Jwt from "../infrastructure/utils/Jwt";
import Bcrypt from "../infrastructure/utils/bcrypt";
import Imailer from "./interface/IMailer";
import OtpRepo from "../infrastructure/repository/otpRepository";

class StudentUseCase {
  constructor(
    private generateOtp: GenerateOTP,
    private repository: IStudentRepo,
    private Jwt: Jwt,
    private bcrypt: Bcrypt,
    private sendmail: Imailer,
    private OtpRepo: OtpRepo
  ) {
    this.repository = repository;
    this.generateOtp = generateOtp;
    this.sendmail = sendmail;
    this.OtpRepo = OtpRepo;
    this.Jwt = Jwt;
  }
  async signUpAndSendOtp(studentData: student) {
    try {
      const studentFound = await this.repository.findStudentByEMail(
        studentData.email
      );

      if (studentFound) {
        return { status: false, message: "student already exist" };
      } else {
        let payload: { email: string } = {
          email: studentData.email,
        };
        let otp = this.generateOtp.generateOTP();
        this.sendmail.sendMail(studentData.email, parseInt(otp));
        let jwtToken = jwt.sign(payload, process.env.jwt_secret as string);
        this.OtpRepo.createOtpCollection(studentData.email, otp);
        let hashedPass = await this.bcrypt.hashPass(studentData.password);
        hashedPass ? (studentData.password = hashedPass) : "";

        await this.repository.saveStudentToDatabase(studentData);
        return { status: true, Token: jwtToken };
      }
    } catch (error) {
      throw error;
    }
  }

  async authenticate(token: string, otp: string) {
    try {
      let decodeToken = this.Jwt.verifyToken(token);
      if (decodeToken) {
        let fetchOtp = await this.OtpRepo.getOtpByEmail(decodeToken.email);
        if (fetchOtp) {
          if (fetchOtp.otp == otp) {
            let studentToken = this.Jwt.createToken(
              decodeToken.email,
              "student"
            );
            let studentData = await this.repository.fetchStudentData(
              decodeToken.email
            );
            await this.repository.verifyStudent(decodeToken.email);
            return {
              status: true,
              token: studentToken,
              studentData: studentData,
            };
          } else {
            return { status: false, message: "invalid otp" };
          }
        } else {
          return { status: false, message: "otp has been expired!!!" };
        }
      }
    } catch (error) {
      throw error;
    }
  }
  async loginStudent(email: string, password: string) {
    let studentFound = await this.repository.findStudentByEMail(email);

    if (studentFound) {
      let verified = await this.bcrypt.encryptPass(
        password,
        studentFound.password
      );

      if (!verified) {
        return { status: false, message: "incorrect password" };
      } else if (studentFound.is_blocked) {
        return { status: false, message: "user is blocked" };
      } else {
        let token = this.Jwt.createToken(studentFound._id, "student");
        return { status: true, token: token, student: studentFound };
      }
    } else {
      return { status: false, message: "please create an account" };
    }
  }

  async googleAuth(credential: any) {
    try {
      let { name, email } = credential;
      let studentFound = await this.repository.findStudentByEMail(email);
      if (studentFound) {
      
        if (studentFound.is_blocked) {
            console.log("blocked");
            
          return {
            status: false,
            message: `hey ${name} you are blocked by admin`,
          };
        } else {
         let token = this.Jwt.createToken(email, "student");
          return { status: true, message: `hey ${name} welcome back!!`, token };
        }
      } else {
        await this.repository.saveGoogleAuth(credential);
        let token = this.Jwt.createToken(email, "student");
        return {
          status: true,
          message: `welcome ${name} let's learn logether`,
          token
        };
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export default StudentUseCase;
