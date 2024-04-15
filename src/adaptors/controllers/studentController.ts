import { Request, Response } from "express";
import StudentUseCase from "../../useCase/studentUseCase";

class StudentController {
  private studentUseCase: StudentUseCase;
  constructor(studentUseCase: StudentUseCase) {
    this.studentUseCase = studentUseCase;
  }

  async SignUpAndSendOtp(req: Request, res: Response) {
    try {
      let resposneFromSignUp = await this.studentUseCase.signUpAndSendOtp(
        req.body
      );
      if (resposneFromSignUp.status) {
        res
          .cookie("studentOtp", resposneFromSignUp.Token, {
            expires: new Date(Date.now() + 25892000000),
            secure: true,
          })
          .status(200)
          .json(resposneFromSignUp);
      } else {
        console.log(resposneFromSignUp);

        res.status(401).json(resposneFromSignUp);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async authenticateStudent(req: Request, res: Response) {
    try {
      let token = req.cookies.studentOtp;

      let response = await this.studentUseCase.authenticate(
        token,
        req.body.otp
      );
      if (response?.status) {
        res
          .cookie("student", response.token, {
            expires: new Date(Date.now() + 25892000000),
            secure: true,
          })
          .status(200)
          .json(response);
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
              secure: true,
            })
            .status(200)
            .json({
              verifiedStudent,
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
        res
          .cookie("studentToken", response.token, {
            expires: new Date(Date.now() + 25892000000),
            secure: true,
          })
          .status(200)
          .json(response);
      } else {
        res.status(401).json(response);
      }
    } catch (error) {
      console.log(error);
    }
  }
  async verifyByEmail(req: Request, res: Response) {
    try {
      console.log("called");

      let id = req.query.id as string;
      console.log(id);

      await this.studentUseCase.verifyByEMail(id);
    } catch (error) {
      console.log(error);
    }
  }
}

export default StudentController;
