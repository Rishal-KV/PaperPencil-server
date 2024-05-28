"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const questions_1 = __importDefault(require("../database/questions"));
const courseModel_1 = __importDefault(require("../database/courseModel"));
const enrolledCourse_1 = __importDefault(require("../database/enrolledCourse"));
class QuestionRepo {
    async addQuestion(question, options, correctOption, courseId) {
        const questions = await questions_1.default.create({
            question,
            options,
            correctOption,
            courseId,
        });
        await courseModel_1.default.findOneAndUpdate({ _id: courseId }, {
            $push: {
                questions: questions._id,
            },
        }, {
            upsert: true,
        });
        return questions;
    }
    async fetchQuestions(courseId) {
        try {
            const questions = await questions_1.default.find({ courseId: courseId });
            if (questions) {
                return questions;
            }
            else {
                return null;
            }
        }
        catch (error) {
            throw error;
        }
    }
    async answerTotheQuestion(questionId, answer, courseId, studentId) {
        try {
            const correctAnswer = await questions_1.default.findOne({
                _id: questionId,
                correctOption: { $eq: answer },
            });
            if (correctAnswer) {
                await enrolledCourse_1.default.findOneAndUpdate({ course: courseId, studentId }, { $push: { attendedQuestions: questionId } }, {
                    upsert: true,
                });
                return true;
            }
            else {
                return false;
            }
        }
        catch (error) {
            throw error;
        }
    }
    async removeQuestion(questionId, courseId) {
        try {
            await questions_1.default.findOneAndDelete({ _id: questionId });
            const removed = await courseModel_1.default.findOneAndUpdate({ _id: courseId }, {
                $pull: { questions: questionId },
            }, { new: true });
            return removed;
        }
        catch (error) {
            throw error;
        }
    }
    async editQuestion(questionId, question, options, correctOption) {
        try {
            const updated = await questions_1.default.findOneAndUpdate({ _id: questionId }, {
                $set: {
                    question: question,
                    options: options,
                    correctOption: correctOption,
                },
            });
            return updated;
        }
        catch (error) {
            throw error;
        }
    }
}
exports.default = QuestionRepo;
