"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lessons_1 = __importDefault(require("../database/lessons"));
class LessonRepo {
    addLesson(lessonUrl, title) {
        try {
            let saveLesson = lessons_1.default.create({
                title: title,
                videoUrl: lessonUrl,
            });
            return saveLesson;
        }
        catch (error) {
            throw error;
        }
    }
    async deleteLesson(id) {
        try {
            console.log(id);
            let deleted = await lessons_1.default.deleteOne({ _id: id });
            if (deleted) {
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
}
exports.default = LessonRepo;
