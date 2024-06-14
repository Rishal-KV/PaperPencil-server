"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class QuestionController {
    questionUseCase;
    constructor(questionUseCase) {
        this.questionUseCase = questionUseCase;
    }
    async addQuestion(req, res) {
        try {
            const { question, options, correctOption, courseId } = req.body;
            const response = await this.questionUseCase.addQuestions(question, options, correctOption, courseId);
            if (response.status) {
                res.status(200).json(response);
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    async fetchQuestion(req, res) {
        try {
            const courseId = req.query.courseId;
            const response = await this.questionUseCase.fetchQuestion(courseId);
            if (response?.status) {
                res.status(200).json(response);
            }
            else {
                res.status(200).json(response);
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    async answerToQuestion(req, res) {
        try {
            const questionId = req.body.questionId;
            const answer = req.body.answer;
            const courseId = req.body.courseId;
            const studentId = req.body.studentId;
            const response = await this.questionUseCase.answerToQuestion(questionId, answer, courseId, studentId);
            if (response?.status) {
                res.status(200).json(response);
            }
            else {
                res.status(200).json(response);
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    async removeQuestion(req, res) {
        try {
            const courseId = req.query.courseId;
            const questionId = req.query.questionId;
            const response = await this.questionUseCase.removeQuestion(questionId, courseId);
            res.status(200).json(response);
        }
        catch (error) {
            console.log(error);
        }
    }
    async editQuestion(req, res) {
        try {
            const { questionId, question, options, correctOption } = req.body;
            const response = await this.questionUseCase.updateQuestion(questionId, question, options, correctOption);
            res.status(200).json(response);
        }
        catch (error) {
            console.log(error);
        }
    }
}
exports.default = QuestionController;
