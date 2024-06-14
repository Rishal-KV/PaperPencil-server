"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chapter_1 = __importDefault(require("../database/chapter"));
class ChapterRepo {
    async createChapter(chapter, order, id, description) {
        console.log(chapter);
        try {
            let chapterAdded = await chapter_1.default.create({
                title: chapter,
                course: id,
                order: order,
                description: description
            });
            return chapterAdded;
        }
        catch (error) {
            throw error;
        }
    }
    async getChapterById(id) {
        let chapters = await chapter_1.default
            .find({ course: id })
            .populate("lessons").populate({ path: 'course', populate: { path: 'category' } })
            .sort("order");
        if (chapters) {
            return chapters;
        }
        else {
            return null;
        }
    }
    async insertLesson(id, lesson) {
        let result = await chapter_1.default.updateOne({ _id: id }, {
            $push: { lessons: lesson },
        });
        if (result) {
            return true;
        }
        else {
            return false;
        }
    }
    async findChapterOfCourse(id) {
        try {
            let chapters = await chapter_1.default.find({ course: id });
            if (chapters) {
                return chapters;
            }
            else {
                return [];
            }
        }
        catch (error) {
            throw error;
        }
    }
    async editChapter(id, title, order) {
        try {
            let updated = await chapter_1.default.findOneAndUpdate({ _id: id }, {
                title: title,
                order: order,
            });
            if (updated) {
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
    async deleteLesson(chapterId, lessonId) {
        try {
            let deleted = await chapter_1.default.findByIdAndUpdate({ _id: chapterId }, { $pull: { lessons: lessonId } }, { new: true });
            console.log(deleted);
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
exports.default = ChapterRepo;
