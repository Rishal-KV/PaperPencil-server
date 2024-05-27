import questionModel from "../database/questions";
import IQuestion from "../../useCase/interface/IQuestion";
import Question from "../../domain/questions";
import courseModel from "../database/courseModel";
import enrolledCourseModel from "../database/enrolledCourse";
import Course from "../../domain/course";
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
  async removeQuestion(
    questionId: string,
    courseId: string
  ): Promise<Course | null> {
    try {
      await questionModel.findOneAndDelete({ _id: questionId });
      const removed = await courseModel.findOneAndUpdate(
        { _id: courseId },
        {
          $pull: { questions: questionId },
        },
        { new: true }
      );
      return removed;
    } catch (error) {
      throw error;
    }
  }
  async editQuestion(
    questionId: string,
    question: string,
    options: string[],
    correctOption: number,
  ): Promise<Question | null> {
    try {
      const updated = await questionModel.findOneAndUpdate(
        { _id: questionId },
        {
          $set: {
            question: question,
            options: options,
            correctOption: correctOption,
          },
        }
      );
      return updated;
    } catch (error) {
      throw error;
    }
  }
}

export default QuestionRepo;
