import EnrolledCourseUseCase from "../../useCase/enrolledCourse";
import { Request, Response } from "express";
import {
  generateCertificate,
  generateInvoice,
} from "../../infrastructure/utils/pdfKIT";
import { IsCourseCompleted } from "../../domain/enrolledCourse";
class EnrollController {
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
  async fetchCourse(req: Request, res: Response) {
    try {
      const studentId = req.query.studentId as string;

      const response = await this.enrollUseCase.enrolledCourse(studentId);
      if (response?.status) {
        res.status(200).json(response);
      } else {
        res.status(401).json(response);
      }
    } catch (error) {
      console.log(error);
    }
  }
  async enrollments(req: Request, res: Response) {
    try {
      const courseId = req.query.courseId as string;

      const response = await this.enrollUseCase.enrollments(courseId);
      if (response) {
        res.status(200).json(response);
      } else {
        res.status(200).json(response);
      }
    } catch (error) {
      console.log(error);
    }
  }
  async calProfit(req: Request, res: Response) {
    try {
      const instructorId = req.query.instructorId as string;
      const response = await this.enrollUseCase.getProfit(instructorId);
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
    }
  }
  async saveProgress(req: Request, res: Response) {
    try {
      const lessonId = req.body.lessonId;
      const courseId = req.body.courseId;
      const studentId = req.body.studentId;
      const response = await this.enrollUseCase.saveProgress(
        courseId,
        lessonId,
        studentId
      );
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
    }
  }
  async checkProgress(req: Request, res: Response) {
    try {
      const studentId = req.query.studentId as string;
      const courseId = req.query.courseId as string;
      const response = await this.enrollUseCase.checkProgress(
        studentId,
        courseId
      );
      if (response?.status) {
        res.status(200).json(response);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async createChat(req: Request, res: Response) {
    try {
      const { studentId, instructorId } = req.body;
      console.log(req.body);

      const response = await this.enrollUseCase.createChat(
        studentId,
        instructorId
      );
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
    }
  }

  async fetchMonthlySales(req: Request, res: Response) {
    try {
      const insturctorId = req.query.instructorId as string;

      const response = await this.enrollUseCase.fetchMonthlySales(insturctorId);
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
    }
  }

  async generateCertificate(req: Request, res: Response) {
    try {
      const courseId = req.params.courseId;
      const studentId = req.params.studentId;
      const isCourseCompleted: IsCourseCompleted =
        (await this.enrollUseCase.isCourseCompleted(
          courseId,
          studentId
        )) as any;

      if (isCourseCompleted) {
        generateCertificate(
          res,
          isCourseCompleted.response?.studentId.name as string,
          isCourseCompleted.response?.course.name as string,
          isCourseCompleted.response?.completedDate as Date
        );
        res.setHeader(
          "Content-Disposition",
          "attachment; filename=certificate.pdf"
        );
        res.setHeader("Content-Type", "application/pdf");
      } else {
        res.status(401).json({ message: "course not completed" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send("An error occurred");
    }
  }

  async courseProgress(req: Request, res: Response) {
    try {
      const studentId = req.body.studentId;
      const courseId = req.body.courseId;
      const date = req.body.date;

      const response = await this.enrollUseCase.saveCourseProgress(
        studentId,
        courseId,
        date
      );

      res.status(200).json(response);
    } catch (error) {
      console.log(error);
    }
  }
  async generateInvoice(req: Request, res: Response) {
    try {
      const courseId = req.query.courseId as string;
      const studentId = req.query.studentId as string;
      const response: any = await this.enrollUseCase.generateInvoice(
        courseId,
        studentId
      );
      if (response) {
        console.log(response, "ress");

        generateInvoice(
          res,
          response.studentId.name,
          response.course.name,
          response.course.price,
          response.course.description,
          response.enrolled
        );
        res.setHeader(
          "Content-Disposition",
          "attachment; filename=invoice.pdf"
        );
        res.setHeader("Content-Type", "application/pdf");
      } else {
        res.status(401).json({ message: "course not completed" });
      }
    } catch (error) {
      console.log(error);
    }
  }
}
export default EnrollController;
