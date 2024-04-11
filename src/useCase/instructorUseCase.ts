import Instructor from "../domain/instructor";
import InstructorRepo from "../infrastructure/repository/instructorRepo";
import Jwt from "../infrastructure/utils/Jwt";
import GenerateOTP from "../infrastructure/utils/generateOtp";
import jwt from "jsonwebtoken";
import Imailer from "./interface/IMailer";
import Bcrypt from "../infrastructure/utils/bcrypt";
import OtpRepo from "../infrastructure/repository/otpRepository";
class InstructorUseCase {
  private instructorRepo: InstructorRepo;
  private jwt: Jwt;
  private generateOtp: GenerateOTP;
  private sendmail: Imailer;
  private bcrypt: Bcrypt;
  private OtpRepo: OtpRepo;
  constructor(
    instructorRepo: InstructorRepo,
    jwt: Jwt,
    generateOtp: GenerateOTP,
    sendmail: Imailer,
    bcrypt: Bcrypt,
    otp: OtpRepo
  ) {
    this.instructorRepo = instructorRepo;
    this.jwt = jwt;
    this.generateOtp = generateOtp;
    this.sendmail = sendmail;
    this.bcrypt = bcrypt;
    this.OtpRepo = otp;
  }

  async signUpAndSendOtp(InstructorData: Instructor) {
    try {
      const instrcutorFound = await this.instructorRepo.findInstructorByEmail(
        InstructorData.email
      );

      if (instrcutorFound) {
        return { status: false, message: "instructor already exist" };
      } else {
        let otp = this.generateOtp.generateOTP();
        this.sendmail.sendMail(InstructorData.email, parseInt(otp));
        this.OtpRepo.createOtpCollection(InstructorData.email, otp);
        let hashedPass = await this.bcrypt.hashPass(InstructorData.password);
        hashedPass ? (InstructorData.password = hashedPass) : "";
        let savedInstructor =
          await this.instructorRepo.saveInstructorToDatabase(InstructorData);
        let payload: {
          name: string | undefined;
          id: string | undefined;
          email: string | undefined;
        } = {
          name: savedInstructor?.name,
          email: savedInstructor?.email,
          id: savedInstructor?._id,
        };
        let jwtToken = jwt.sign(payload, process.env.jwt_secret as string);

        return { status: true, Token: jwtToken };
      }
    } catch (error) {
      throw error;
    }
  }

  async authenticate(token: string, otp: string) {
    try {
      let decodeToken = this.jwt.verifyToken(token);
      console.log(decodeToken);

      if (decodeToken) {
        let fetchOtp = await this.OtpRepo.getOtpByEmail(decodeToken.email);
        if (fetchOtp) {
          if (fetchOtp.otp == otp) {
            let instructorToken = this.jwt.createToken(
              decodeToken._id,
              "instructor"
            );
            let instructorData = await this.instructorRepo.fetchInstructorData(
              decodeToken.email
            );
            await this.instructorRepo.verifyInstructor(decodeToken.email);
            return {
              status: true,
              token: instructorToken,
              instructorData: instructorData,
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
  async Login(instructorData: { email: string; password: string }) {
    let instructorDB = await this.instructorRepo.findInstructorByEmail(
      instructorData.email
    );

    if (instructorDB) {
      if (instructorDB.is_blocked) {
        return { status: false, message: "Account is blocked" };
      } else {
        let instructor = await this.instructorRepo.fetchInstructorData(
          instructorDB.email
        );

        let verifyPassword = await this.bcrypt.encryptPass(
          instructorData.password,
          instructorDB.password
        );
        if (verifyPassword) {
          let Token = this.jwt.createToken(instructor?._id, "instructor");
          return { status: true, token: Token, instructor: instructor };
        } else {
          return { status: false, message: "invalid password" };
        }
      }
    } else {
      return { status: false, message: "No account found" };
    }
  }
  async googleAuth(credential: any) {
    try {
      let { name, email } = credential;
      let instrcutorFound = await this.instructorRepo.findInstructorByEmail(
        email
      );
      if (instrcutorFound) {
        if (instrcutorFound.is_blocked) {
          console.log("blocked");

          return {
            status: false,
            message: `hey ${name} you are blocked by admin`,
          };
        } else {
          let token = this.jwt.createToken(instrcutorFound._id, "instrcutor");
          return { status: true, message: `hey ${name} welcome back!!`, token };
        }
      } else {
        let instructor = await this.instructorRepo.saveGoogleAuth(credential);

        let token = this.jwt.createToken(instructor._id, "instructor");
        return {
          status: true,
          message: `welcome ${name} `,
          token,
        };
      }
    } catch (error) {
      throw error;
    }
  }
}

export default InstructorUseCase;
