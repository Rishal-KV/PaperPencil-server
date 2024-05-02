import EnrolledCourseUseCase from "../../useCase/enrolledCourse";
import { Request, Response } from "express";
class enrollController {
  private enrollUseCase: EnrolledCourseUseCase;
  constructor(enrollUseCase: EnrolledCourseUseCase) {
    this.enrollUseCase = enrollUseCase;
  }
  async enroll(req: Request, res: Response) {
    try {
      let { courseId, studentId } = req.body;
      let response = await this.enrollUseCase.enrollCourse(courseId, studentId);
      if (response) {
        res.status(200).json(response);
      } else {
        res.status(401).json(response);
      }
    } catch (error) {
      console.log(error);
    }
  }
  async checkEnroll(req: Request, res: Response) {
    try {
      let courseId = req.query.courseId as string;
      let studentId = req.query.studentId as string;


      let enrolled = await this.enrollUseCase.checkEnroll(studentId, courseId);
    
      
      if (enrolled?.enrolled) {
        res.status(200).json(enrolled);
      } else {
        res.status(200).json(enrolled);
      }
    } catch (error) {
      console.log(error);
    }
  }
  async fetchCourse(req:Request,res:Response){
    try {
      const studentId = req.query.studentId as string
  
      
      const response = await this.enrollUseCase.enrolledCourse(studentId);
      if (response?.status) {
        res.status(200).json(response)
      }else{
        res.status(401).json(response)
      }
    } catch (error) {
      console.log(error);
      
    }
  }
}
export default enrollController;
