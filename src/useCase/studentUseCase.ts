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
import Icourse from "./interface/ICourse";
import cron from "node-cron";
class StudentUseCase {
  constructor(
    private generateOtp: GenerateOTP,
    private repository: IStudentRepo,
    private Jwt: Jwt,
    private bcrypt: Bcrypt,
    private sendmail: Imailer,
    private OtpRepo: OtpRepo,
    private courseRepo: Icourse
  ) {
    this.repository = repository;
    this.generateOtp = generateOtp;
    this.sendmail = sendmail;
    this.OtpRepo = OtpRepo;
    this.Jwt = Jwt;
    this.courseRepo = courseRepo;
  }
  async signUpAndSendOtp(studentData: student) {
    try {
      const studentFound = await this.repository.findStudentByEMail(
        studentData.email
      );
      if (studentFound) {
        if (studentFound && studentFound.is_Verified) {
          return {
            status: false,
            message: "user with this email already exist!!!",
          };
        }
        if (!studentFound.is_Verified) {
          const password = await this.bcrypt.hashPass(studentData.password);
          await this.repository.setStudent(
            studentData.email,
            password as string
          );
          let payload: { email: string; role: string } = {
            email: studentData.email,
            role: "student",
          };
          let otp = this.generateOtp.generateOTP();
          this.sendmail.sendMail(studentData.email, parseInt(otp));
          cron.schedule("* * * * *", async () => {
            await this.OtpRepo.removeOtp(studentData.email);
          });

          let jwtToken = jwt.sign(payload, process.env.jwt_secret as string);
          await this.OtpRepo.createOtpCollection(studentData.email, otp);
          return {
            not_verified: true,
            token: jwtToken,
          };
        }
      } else {
        let payload: { email: string; role: string } = {
          email: studentData.email,
          role: "student",
        };
        let otp = this.generateOtp.generateOTP();
        this.sendmail.sendMail(studentData.email, parseInt(otp));
        cron.schedule("* * * * *", async () => {
          await this.OtpRepo.removeOtp(studentData.email);
        });

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
            let studentToken = this.Jwt.createToken(decodeToken._id, "student");
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
      let student = await this.repository.fetchStudentData(email);
      if (!studentFound.is_Verified) {
        return { status: false, message: "Account is not verified!!" };
      }
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
        return {
          status: true,
          token: token,
          student: student,
          message: `welcome ${studentFound.name}`,
        };
      }
    } else {
      return { status: false, message: "please create an account" };
    }
  }

  async googleAuth(credential: any) {
    try {
      console.log(credential);

      let { name, email } = credential;
      let studentFound = await this.repository.findStudentByEMail(email);

      if (studentFound) {
        if (studentFound.is_blocked) {
          return {
            status: false,
            message: `hey ${name} you are blocked by admin`,
          };
        } else {
          let studentData = await this.repository.fetchStudentData(email);
          let token = this.Jwt.createToken(studentData?._id, "student");
          return {
            status: true,
            message: `hey ${name} welcome back!!`,
            token,
            studentData,
          };
        }
      } else {
        let student = await this.repository.saveGoogleAuth(credential);
        let token = this.Jwt.createToken(student._id, "student");
        let studentData = await this.repository.fetchStudentData(email);
        return {
          status: true,
          message: `welcome ${name} let's learn logether`,
          token,
          studentData,
        };
      }
    } catch (error) {
      console.log(error);
    }
  }

  async forgotPassword(email: string) {
    try {
      let student = await this.repository.findStudentByEMail(email);
      if (student) {
        const otp = this.generateOtp.generateOTP();
        this.OtpRepo.createOtpCollection(student.email, otp);
        await this.sendmail.sendMail(student.email, parseInt(otp));
        let payload: { email: string } = {
          email: email,
        };
        const cronjob = cron.schedule("* * * * *", async () => {
          await this.OtpRepo.removeOtp(email);
          cronjob.stop();
        });
        const token = jwt.sign(payload, process.env.jwt_secret as string);

        return { status: true, student: student.email, token };
      } else {
        return { status: false, message: "no student found" };
      }
    } catch (error) {
      console.log(error);
    }
  }
  async setForgotPassword(email: string, password: string) {
    try {
      const decodeToken = this.Jwt.verifyToken(email);
      let becryptedPassword = await this.bcrypt.hashPass(password);
      if (typeof becryptedPassword == "string") {
        let updated = await this.repository.setForgotPassword(
          decodeToken?.email,
          becryptedPassword
        );
        if (updated) {
          return { status: true, message: "password changed successfully" };
        } else {
          return { status: false, message: "failed to change password" };
        }
      } else {
        console.log("failed to encrypt");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async get_studentData(studentId: string) {
    try {
      let data = await this.repository.getStudentById(studentId);
      if (data) {
        return { status: true, student: data };
      }
    } catch (error) {
      console.log(error);
    }
  }
  async updateProfile(studentId: string, data: student) {
    try {
      let updated = await this.repository.updateProfile(studentId, data);
      if (updated) {
        return { status: true, message: "profile updated successfully" };
      }
    } catch (error) {
      console.log(error);
    }
  }

  async updateImage(token: string, image: any) {
    try {
      let decodeToken = this.Jwt.verifyToken(token);
      let response = await this.repository.updateImage(decodeToken?.id, image);
      if (response) {
        return { status: true, message: "image updated successfully" };
      }
    } catch (error) {
      console.log(error);
    }
  }
  async confirmForgotOtp(email: string, otp: string) {
    try {
      const decodeToken = this.Jwt.verifyToken(email);
      const response = await this.OtpRepo.getOtpByEmail(decodeToken?.email);
      console.log(response);

      if (response) {
        if (response.otp == otp) {
          return { status: true };
        } else {
          return { status: false, message: "incorrect otp!!!" };
        }
      } else {
        return { status: false, message: "otp has been expired" };
      }
    } catch (error) {
      console.log(error);
    }
  }

  async resendOtp(token: string) {
    const decodeToken = this.Jwt.verifyToken(token);
    if (decodeToken && decodeToken.email) {
      let otp = this.generateOtp.generateOTP();
      this.OtpRepo.createOtpCollection(decodeToken.email, otp);
      const cronjob = cron.schedule("* * * * *", async () => {
        await this.OtpRepo.removeOtp(decodeToken.email);
        cronjob.stop();
      });
      this.sendmail.sendMail(decodeToken.email, parseInt(otp));
      return { status: true, message: "otp resend successfully" };
    }
  }

  async changePassword(password: string, email: string, newPassword: string) {
    try {
      const student = await this.repository.findStudentByEMail(email);
      const verified = await this.bcrypt.encryptPass(
        password,
        student?.password
      );
      if (verified) {
        await this.repository.updatePassword(email, newPassword);
        return { status: true, message: "password has been updated" };
      } else {
        return { status: false, message: "current password doesnt match!!!" };
      }
    } catch (error) {
      throw error;
    }
  }
}

export default StudentUseCase;
