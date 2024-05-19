import QuestionRepo from "../infrastructure/repository/question";

class  QuestionUseCase {
    private questionRepo : QuestionRepo
    constructor(questionRepo:QuestionRepo){
        this.questionRepo = questionRepo
    }
    async addQuestions(question:string,options:string[], correctOption:number, courseId:string){
        const questions = await  this.questionRepo.addQuestion(question,options,correctOption,courseId);
        return {status:true,questions}
    }
}

export default QuestionUseCase