
import Question from "../../domain/questions"
interface IQuestion {
  addQuestion(question:string, options:string[], correctOption:number,courseId:string):Promise<Question>
}

export default IQuestion