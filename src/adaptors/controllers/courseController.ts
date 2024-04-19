import CourseUseCase from "../../useCase/courseUseCase";
import { Request, Response } from "express";
import cloudinary from "../../infrastructure/utils/cloudinary";

import fs from "fs";
class CourseController {
  private courseUseCase?: CourseUseCase;
  constructor(courseUseCase?: CourseUseCase) {
    this.courseUseCase = courseUseCase;
  }

  async addCourse(req: Request, res: Response) {
    try {
      let formData = req.body;

      let instructor = req.cookies.instructorToken as string;
      
      

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

        let response = await this.courseUseCase?.saveCourse(
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

      let courseData = await this.courseUseCase?.fetchCourseData(token);

      res.status(200).json(courseData);
    } catch (error) {
      console.log(error);
    }
  }

  async fetchCourse(req: Request, res: Response) {
    try {
      let course = await this.courseUseCase?.fetchCourse();

      res.status(200).json({ course: course });
    } catch (error) {
      console.log(error);
    }
  }
  async publishCourse(req: Request, res: Response) {
    try {
      let { id } = req.body;
      let published = await this.courseUseCase?.publishCourse(id);
      if (published?.status) {
        res.status(200).json(published);
      } else {
        res.status(401).json(published);
      }
    } catch (error) {
      console.log(error);
    }
  }
  async courseAction(req:Request,res:Response){
    try {
      let {id} = req.body
     
      
      let actionResponse = await this.courseUseCase?.courseAction(id);
    
      
      if (actionResponse?.status) {
        res.status(200).json(actionResponse)
      }else{
        res.status(400).json(actionResponse)
      }
    } catch (error) {
      console.log(error);
      
    }
  }
  async courseList(req:Request,res:Response){
    try {
      let {id} = req.body;
      console.log(id);
      
      let response = await this.courseUseCase?.listCourse(id);
      console.log(response);
      
      res.status(200).json(response)
    } catch (error) {
      
    }
  }
  async fetchSpecificCourse(req:Request,res:Response){
    try {
      let id = req.query.id as string
      console.log(id);
      
      let courses = await this.courseUseCase?.fetchSpecificCourse(id);
      if (courses?.status) {
        res.status(200).json(courses)
      }else{
        res.status(401).json(courses)
      }
    } catch (error) {
      console.log(error);
      
    }
  }
}

export default CourseController;
