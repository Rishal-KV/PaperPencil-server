import ReviewUseCase from "../../useCase/reviewUseCase";
import { Request, Response } from "express";
class ReviewController {
  private review: ReviewUseCase;
  constructor(review: ReviewUseCase) {
    this.review = review;
  }
  async addReview(req: Request, res: Response) {
    try {
      const review = req.body.review;

      const studentId = req.body.studentId;

      const response = await this.review.review(review, studentId);
      if (response?.status) {
        res.status(200).json(response);
      } else {
        res.status(200).json(response);
      }
    } catch (error) {
      console.log(error);
    }
  }
  async checkReview(req: Request, res: Response) {
    try {
      const studentId = req.query.studentId as string;
      const courseId = req.query.courseId as string;

      const response = await this.review.checkReview(courseId, studentId);
      if (response?.status) {
        res.status(200).json(response);
      } else {
        res.status(200).json(response);
      }
    } catch (error) {
      console.log(error);
    }
  }
  async fetchReviews(req: Request, res: Response) {
    try {
      const courseId = req.query.courseId as string;
      console.log(courseId);
      
      const response = await this.review.fetchReview(courseId);
     
     

      res.status(200).json(response);
    } catch (error) {
      console.log(error);
    }
  }
}

export default ReviewController;
