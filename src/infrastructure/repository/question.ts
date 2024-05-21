import questionModel from "../database/questions";
import IQuestion from "../../useCase/interface/IQuestion";
import Question from "../../domain/questions";
import courseModel from "../database/courseModel";
import enrolledCourseModel from "../database/enrolledCourse";
class QuestionRepo implements IQuestion {
  async addQuestion(
    question: string,
    options: string[],
    correctOption: number,
    courseId: string
  ): Promise<Question> {
    const questions: Question = await questionModel.create({
      question,
      options,
      correctOption,
      courseId,
    });

    await courseModel.findOneAndUpdate(
      { _id: courseId },
      {
        $push: {
          questions: questions._id,
        },
      },
      {
        upsert: true,
      }
    );
    return questions;
  }
  async fetchQuestions(courseId: string): Promise<Question[] | null> {
    try {
      const questions = await questionModel.find({ courseId: courseId });
      if (questions) {
        return questions;
      } else {
        return null;
      }
    } catch (error) {
      throw error;
    }
  }
  async answerTotheQuestion(
    questionId: string,
    answer: number,
    courseId: string,
    studentId: string
  ): Promise<boolean> {
    try {
      const correctAnswer = await questionModel.findOne({
        _id: questionId,
        correctOption: { $eq: answer },
      });
      if (correctAnswer) {
        await enrolledCourseModel.findOneAndUpdate(
          { course: courseId, studentId },
          { $push: { attendedQuestions: questionId } },
          {
            upsert: true,
          }
        );

        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw error;
    }
  }
}

export default QuestionRepo;
