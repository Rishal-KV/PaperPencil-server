"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class QuestionUseCase {
    questionRepo;
    constructor(questionRepo) {
        this.questionRepo = questionRepo;
    }
    async addQuestions(question, options, correctOption, courseId) {
        const questions = await this.questionRepo.addQuestion(question, options, correctOption, courseId);
        return { status: true, questions };
    }
    async fetchQuestion(courseId) {
        try {
            const questions = await this.questionRepo.fetchQuestions(courseId);
            if (questions) {
                return { status: true, questions };
            }
            else {
                return { status: false };
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    async answerToQuestion(questionId, answer, courseId, studentId) {
        try {
            const response = await this.questionRepo.answerTotheQuestion(questionId, answer, courseId, studentId);
            if (response) {
                return { status: true, message: "yayy!!!" };
            }
            else {
                return { status: false, message: "oops wrong answer" };
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    async removeQuestion(questionId, courseId) {
        try {
            const response = await this.questionRepo.removeQuestion(questionId, courseId);
            return { response };
        }
        catch (error) {
            console.log(error);
        }
    }
    async updateQuestion(questionId, question, options, correctOption) {
        try {
            const response = await this.questionRepo.editQuestion(questionId, question, options, correctOption);
            return { response };
        }
        catch (error) {
            console.log(error);
        }
    }
}
exports.default = QuestionUseCase;
