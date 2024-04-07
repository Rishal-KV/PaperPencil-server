import { Request, Response } from "express";
import StudentUseCase from "../../useCase/studentUseCase";
import student from "../../domain/student";
import GenerateOTP from "../../infrastructure/utils/generateOtp";

class StudentController {
  private studentUseCase: StudentUseCase;
  constructor(studentUseCase: StudentUseCase) {
    this.studentUseCase = studentUseCase;
  }

  async SignUpAndSendOtp(req: Request, res: Response) {
    try {
      console.log("ehehhe");

      let resposneFromSignUp = await this.studentUseCase.signUpAndSendOtp(
        req.body
      );
      if (resposneFromSignUp.status) {
        console.log(resposneFromSignUp);

        res.status(200).json(resposneFromSignUp);
      } else {
        console.log(resposneFromSignUp);

        res.status(401).json(resposneFromSignUp);
      }
    } catch (error) {
      throw error;
    }
  }

  async authenticateStudent(req: Request, res: Response) {
    try {
      let token = req.headers.authorization as string;

      let response = await this.studentUseCase.authenticate(
        token,
        req.body.otp
      );
      if (response?.status) {
        res.status(200).json(response);
      } else {
        res.status(401).json(response);
      }
    } catch (error) {
      throw error;
    }
  }

  async studentLogin(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      let verifiedStudent = await this.studentUseCase.loginStudent(
        email,
        password
      );

      if (verifiedStudent && verifiedStudent.status) {
        if (verifiedStudent.status) {
          return res
            .cookie("studentToken", verifiedStudent.token, {
              expires: new Date(Date.now() + 25892000000),
              httpOnly: true,
            })
            .status(200)
            .json({
              success: true,
              token: verifiedStudent.token,
              student: verifiedStudent.student,
            });
        } else {
          console.log("hehehe no pass");

          res.status(401).json(verifiedStudent);
        }
      } else {
        res.status(401).json(verifiedStudent);
      }
    } catch (error) {
      console.log(error);
    }
  }
  async googleLogin(req: Request, res: Response) {
    try {
      let response = await this.studentUseCase.googleAuth(req.body);
      if (response?.status) {
        res.status(200).json(response);
      } else {
        res.status(401).json(response);
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export default StudentController;
