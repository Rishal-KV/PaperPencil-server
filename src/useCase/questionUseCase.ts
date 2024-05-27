import QuestionRepo from "../infrastructure/repository/question";
import Question from "../domain/questions";
class QuestionUseCase {
  private questionRepo: QuestionRepo;
  constructor(questionRepo: QuestionRepo) {
    this.questionRepo = questionRepo;
  }
  async addQuestions(
    question: string,
    options: string[],
    correctOption: number,
    courseId: string
  ) {
    const questions = await this.questionRepo.addQuestion(
      question,
      options,
      correctOption,
      courseId
    );
    return { status: true, questions };
  }

  async fetchQuestion(courseId: string) {
    try {
      const questions: Question[] | null =
        await this.questionRepo.fetchQuestions(courseId);
      if (questions) {
        return { status: true, questions };
      } else {
        return { status: false };
      }
    } catch (error) {
      console.log(error);
    }
  }

  async answerToQuestion(
    questionId: string,
    answer: number,
    courseId: string,
    studentId: string
  ) {
    try {
      const response = await this.questionRepo.answerTotheQuestion(
        questionId,
        answer,
        courseId,
        studentId
      );
      if (response) {
        return { status: true, message: "yayy!!!" };
      } else {
        return { status: false, message: "oops wrong answer" };
      }
    } catch (error) {
      console.log(error);
    }
  }
  async removeQuestion(questionId: string, courseId: string) {
    try {
      const response = await this.questionRepo.removeQuestion(
        questionId,
        courseId
      );
      return { response };
    } catch (error) {
      console.log(error);
    }
  }

  async updateQuestion(
    questionId: string,
    question: string,
    options: string[],
    correctOption: number
  ) {
    try {
      const response = await this.questionRepo.editQuestion(questionId,question,options,correctOption);
      return {response}
    } catch (error) {
      console.log(error);
      
    }
  }
}

export default QuestionUseCase;
