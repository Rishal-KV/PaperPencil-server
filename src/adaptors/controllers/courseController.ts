import CourseUseCase from "../../useCase/courseUseCase";
import { Request, Response } from "express";
import cloudinary from "../../infrastructure/utils/cloudinary";

import fs from "fs";
class CourseController {
  private courseUseCase: CourseUseCase;
  constructor(courseUseCase: CourseUseCase) {
    this.courseUseCase = courseUseCase;
  }

  async addCourse(req: Request, res: Response) {
    try {
      let formData = req.body;

      let instructor = req.headers.authorization as string;

      if (req.file) {
        await cloudinary.uploader
          .upload(req.file?.path, { folder: "courses" })
          .then((res) => {
            if (res.url) {
              formData.image = res.url;
              console.log(res.url);

              fs.unlinkSync("./src/public/" + req.file?.originalname);
            } else {
              throw Error("unable to get url");
            }
          })
          .catch((err) => {
            console.log(err);
          });

        let response = await this.courseUseCase.saveCourse(
          formData,
          instructor
        );
        if (response?.status) {
          res.status(200).json(response);
        } else {
          res.status(401).json(response);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  async fetchINstructorCourse(req: Request, res: Response) {
    try {
      let token = req.cookies.instructorToken as string;
      console.log(token);

      let courseData = await this.courseUseCase.fetchCourseData(token);
      console.log(courseData);

      res.status(200).json(courseData);
    } catch (error) {
      console.log(error);
    }
  }

  async fetchCourse(req: Request, res: Response) {
    try {
      let course = await this.courseUseCase.fetchCourse();
  
    console.log("racjerss");
    
    
        res.status(200).json({course:course})
      
    } catch (error) {
      console.log(error);
    }
  }
}

export default CourseController;
