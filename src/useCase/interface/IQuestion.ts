
import Question from "../../domain/questions"
interface IQuestion {
  addQuestion(question:string, options:string[], correctOption:number,courseId:string):Promise<Question>
  fetchQuestions(courseId:string):Promise<Question[] | null>;
  answerTotheQuestion(questionId:string, answer:number,courseId:string,studentId:string):Promise<boolean>
}

export default IQuestion