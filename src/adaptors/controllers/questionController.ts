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
    } catch (error) {
      console.log(error);
    }
  }
}

export default QuestionController;
