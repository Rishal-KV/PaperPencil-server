import InstructorUseCase from "../../useCase/instructorUseCase";
import { Request, Response, json } from "express";
import CourseUseCase from "../../useCase/courseUseCase";
class InstructorController {
  private instructor: InstructorUseCase;
  private course: CourseUseCase;

  constructor(instructor: InstructorUseCase, course: CourseUseCase) {
    (this.instructor = instructor), (this.course = course);
  }

  async SignUpAndSendOtp(req: Request, res: Response) {
    try {
      console.log("ehehhe");

      let resposneFromSignUp = await this.instructor.signUpAndSendOtp(req.body);
      if (resposneFromSignUp.status) {
        res
          .cookie("instructorOtpToken", resposneFromSignUp.Token, {
            expires: new Date(Date.now() + 25892000000),
            secure: true,
          })
          .status(200)
          .json(resposneFromSignUp);
      } else {
        res.status(401).json(resposneFromSignUp);
      }
    } catch (error) {
      throw error;
    }
  }
  async authenticateInstructor(req: Request, res: Response) {
    try {
      console.log(req.cookies.instructorOtpToken);
      console.log(req.body);
      
      let token = req.cookies.instructorOtpToken as string;

      let response = await this.instructor.authenticate(token, req.body.otp);
      if (response?.status) {
        res
          .cookie("instructorToken", response.token, {
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
  async Login(req: Request, res: Response) {
    try {
      let instructorData = req.body;

      let verifiedInstructor = await this.instructor.Login(instructorData);
 
      if (verifiedInstructor.status) {
        return res
          .cookie("studentToken", verifiedInstructor.token, {
            expires: new Date(Date.now() + 25892000000),
            secure: true,
          })
          .status(200)
          .json({
            verifiedInstructor,
          });
      } else {
        res.status(401).json(verifiedInstructor);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async dashboard(req: Request, res: Response) {
    try {
      let token = req.cookies.instructorToken;
      console.log(token);
      let courses = await this.course.fetchCourseData(token);

      res.status(200).json(courses);
    } catch (error) {
      console.log(error);
    }
  }
  async googleLogin(req: Request, res: Response) {
    try {
      let response = await this.instructor.googleAuth(req.body);
      if (response?.status) {
        res
          .cookie("instructorToken", response.token, {
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

  async fetchProfile(req:Request,res:Response){
    try {
      const email = req.query.email as string
      const response = await this.instructor.fetchProfile(email)
      console.log(response);
      
      res.status(200).json(response)
    } catch (error) {
      console.log(error);
      
    }
  }
  
}
export default InstructorController;
