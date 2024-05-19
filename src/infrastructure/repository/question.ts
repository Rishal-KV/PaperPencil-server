import questionModel from "../database/questions";
import IQuestion from "../../useCase/interface/IQuestion";
import Question from "../../domain/questions";
class QuestionRepo implements IQuestion {
async addQuestion(question: string, options: string[], correctOption: number,courseId:string): Promise<Question> {
    const questions = await questionModel.create({
        question,
        options,
        correctOption,
        courseId

    })

    return questions
}

}


export default QuestionRepo