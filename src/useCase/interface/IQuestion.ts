
import Course from "../../domain/course";
import Question from "../../domain/questions"
interface IQuestion {
  addQuestion(question:string, options:string[], correctOption:number,courseId:string):Promise<Question>
  fetchQuestions(courseId:string):Promise<Question[] | null>;
  answerTotheQuestion(questionId:string, answer:number,courseId:string,studentId:string):Promise<boolean>
  editQuestion(questionId:string,question:string,op:string[],correctOption:number):Promise<Question | null>
  removeQuestion(questionId:string,courseId:string):Promise<Course|null>
}

export default IQuestion