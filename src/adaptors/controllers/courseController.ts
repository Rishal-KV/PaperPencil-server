import CourseUseCase from "../../useCase/courseUseCase";
import { Request, Response } from "express";
import cloudinary from "../../infrastructure/utils/cloudinary";
import { paymentCheckOut } from "../../infrastructure/utils/stripe";
import fs from "fs";
import EnrolledCourseUseCase from "../../useCase/enrolledCourse";
class CourseController {
  private courseUseCase?: CourseUseCase;
  private enrolledUseCase?: EnrolledCourseUseCase;
  constructor(
    courseUseCase?: CourseUseCase,
    enrollUseCase?: EnrolledCourseUseCase
  ) {
    this.courseUseCase = courseUseCase;
    this.enrolledUseCase = enrollUseCase;
  }

  async addCourse(req: Request, res: Response) {
    try {
      let formData = req.body;
      console.log(formData);

      let instructor = req.headers.authorization as string;

      if (req.file) {
        await cloudinary.uploader
          .upload(req.file?.path, { folder: "courses" })
          .then((res) => {
            if (res.url) {
              formData.image = res.url;
              console.log(res.url);

              fs.unlinkSync("public/" + req.file?.originalname);
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
      let token = req.headers.authorization as string;

      const page =
        (req.query.page as string) == "0" ? 1 : (req.query.page as string);

      let courseData = await this.courseUseCase?.fetchCourseData(
        token,
        page as string
      );

      res.status(200).json(courseData);
    } catch (error) {
      console.log(error);
    }
  }

  async fetchCourse(req: Request, res: Response) {
   
    try {
      console.log("called controller");
      
      const search = req.query.search as string;
      const category = req.query.category as string;
      const price = req.query.price as string;
      const page = req.query.page as string;
      const skip = req.query.skip as string;

  

      let course = await this.courseUseCase?.fetchCourse(
        search,
        category,
        price,
        page,
        skip
      );

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
  async courseAction(req: Request, res: Response) {
    try {
      let { id } = req.body;

      let actionResponse = await this.courseUseCase?.courseAction(id);

      if (actionResponse?.status) {
        res.status(200).json(actionResponse);
      } else {
        res.status(400).json(actionResponse);
      }
    } catch (error) {
      console.log(error);
    }
  }
  async courseList(req: Request, res: Response) {
    try {
      const { id } = req.body;
     

      const response = await this.courseUseCase?.listCourse(id);
      

      res.status(200).json(response);
    } catch (error) {}
  }
  async fetchSpecificCourse(req: Request, res: Response) {
    try {
      const id = req.query.id as string;
      

      const courses = await this.courseUseCase?.fetchSpecificCourse(id);
      if (courses?.status) {
        res.status(200).json(courses);
      } else {
        res.status(401).json(courses);
      }
    } catch (error) {
      console.log(error);
    }
  }
  async payment(req: Request, res: Response) {
    try {
   
      
      const paid = await this.enrolledUseCase?.checkPayment(
        req.body.studentId,
        req.body.course._id
      );
    
      
      if (paid) {
      
        res.json({ paid: true, message: "already paid for this course" });
      } else {
        let sessionId = await paymentCheckOut(req.body.course);
        res.status(200).json(sessionId);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async updateCourse(req: Request, res: Response) {
    try {
      console.log(req.body,"okkk");
      
      const formData = req.body
      
      

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

          const response = await this.courseUseCase?.updateCourse(formData.courseId, formData);
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
  async getInstructor(req: Request, res: Response) {
    try {
      const courseId = req.query.courseId as string;

      const response = await this.courseUseCase?.getInstructor(courseId);
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
    }
  }
}

export default CourseController;
