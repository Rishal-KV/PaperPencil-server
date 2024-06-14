import InstructorUseCase from "../../useCase/instructorUseCase";
import { Request, Response, json } from "express";
import CourseUseCase from "../../useCase/courseUseCase";
import cloudinary from "../../infrastructure/utils/cloudinary";
import fs from "fs";
class InstructorController {
  private instructor: InstructorUseCase;
  private course: CourseUseCase;

  constructor(instructor: InstructorUseCase, course: CourseUseCase) {
    (this.instructor = instructor), (this.course = course);
  }

  async SignUpAndSendOtp(req: Request, res: Response) {
    try {
      let resposneFromSignUp = await this.instructor.signUpAndSendOtp(req.body);
      if (resposneFromSignUp && resposneFromSignUp.status) {
        res.status(200).json(resposneFromSignUp);
      } else {
        res.status(401).json(resposneFromSignUp);
      }
    } catch (error) {
      throw error;
    }
  }
  async authenticateInstructor(req: Request, res: Response) {
    try {
      console.log(req.headers);

      let token = req.headers.authorization as string;

      let response = await this.instructor.authenticate(token, req.body.otp);
      if (response?.status) {
        res.status(200).json(response);
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
        res.status(200).json({
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
      let token = req.headers.authorization as string;

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
        res.status(200).json(response);
      } else {
        res.status(401).json(response);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async fetchProfile(req: Request, res: Response) {
    try {
      const email = req.query.email as string;
      console.log(email, "mama");

      const response = await this.instructor.fetchProfile(email);

      res.status(200).json(response);
    } catch (error) {
      console.log(error);
    }
  }

  async updateProfile(req: Request, res: Response) {
    try {
      const instructorId = req.body.instructorId;

      const instructorData = req.body.instructorData;
      console.log(instructorData);

      const response = await this.instructor.updateProfile(
        instructorId,
        instructorData
      );
      if (response?.status) {
        res.status(200).json(response);
      } else {
        res.status(401).json(response);
      }
    } catch (error) {
      console.log(error);
    }
  }
  async updateImage(req: Request, res: Response) {
    try {
      const token = req.headers.authorization as string;

      let image: string = "";
      console.log(req.file);

      if (req.file) {
        await cloudinary.uploader
          .upload(req.file?.path, { folder: "profile" ,resource_type:'auto'})
          .then(async (imageUploaded) => {
            if (imageUploaded.url) {
              image = imageUploaded.url;
              const response = await this.instructor.updateImage(token, image);

              fs.unlinkSync("./src/public/" + req.file?.originalname);
              if (response?.status) {
                res.status(200).json(response);
              } else {
                res.status(401).json(response);
              }
            } else {
              throw Error("unable to get url");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } catch (error) {
      console.log(error);
    }
  }
  async resendOtp(req: Request, res: Response) {
    try {
      let token = req.cookies.instructorOtpToken as string;
      const resposne = await this.instructor.resendOtp(token);
      if (resposne?.status) {
        res.status(200).json(resposne);
      }
    } catch (error) {
      console.log(error);
    }
  }
  async updatePassword(req: Request, res: Response) {
    try {
      console.log(req.body);

      const { password, newPassword, email } = req.body;
      const updated = await this.instructor.changePassword(
        password,
        email,
        newPassword
      );
      if (updated) {
        res.status(200).json(updated);
      } else {
        res.status(204).json(updated);
      }
    } catch (error) {
      console.log(error);
    }
  }
}
export default InstructorController;
