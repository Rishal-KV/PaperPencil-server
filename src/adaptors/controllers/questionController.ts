import { Request, Response } from "express";
import QuestionUseCase from "../../useCase/questionUseCase";
class QuestionController {
  private questionUseCase: QuestionUseCase;
  constructor(questionUseCase: QuestionUseCase) {
    this.questionUseCase = questionUseCase;
  }

  async addQuestion(req: Request, res: Response) {
    try {
      const { question, options, correctOption, courseId } = req.body;
      const response = await this.questionUseCase.addQuestions(
        question,
        options,
        correctOption,
        courseId
      );
      if (response.status) {
        res.status(200).json(response);
      }
    } catch (error) {
      console.log(error);
    }
  }
  async fetchQuestion(req: Request, res: Response) {
    try {
      const courseId = req.query.courseId as string;

      const response = await this.questionUseCase.fetchQuestion(courseId);
      if (response?.status) {
        res.status(200).json(response);
      } else {
        res.status(200).json(response);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async answerToQuestion(req: Request, res: Response) {
    try {
      const questionId = req.body.questionId;

      const answer = req.body.answer;
      const courseId = req.body.courseId;
      const studentId = req.body.studentId;
      const response = await this.questionUseCase.answerToQuestion(
        questionId,
        answer,
        courseId,
        studentId
      );
      if (response?.status) {
        res.status(200).json(response);
      } else {
        res.status(200).json(response);
      }
    } catch (error) {
      console.log(error);
    }
  }
  async removeQuestion(req: Request, res: Response) {
    try {
      const courseId = req.query.courseId as string;
      const questionId = req.query.questionId as string;
      const response = await this.questionUseCase.removeQuestion(
        questionId,
        courseId
      );
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
    }
  }

  async editQuestion(req: Request, res: Response) {
    try {
      const { questionId, question, options, correctOption } = req.body;

      const response = await this.questionUseCase.updateQuestion(
        questionId,
        question,
        options,
        correctOption
      );
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
    }
  }
  //for testing
  async sample(req:Request,res:Response){
    
  }
}

export default QuestionController;
