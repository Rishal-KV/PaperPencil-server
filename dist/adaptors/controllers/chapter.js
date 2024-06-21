"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ChapterController {
    chapterUseCase;
    constructor(chapter) {
        this.chapterUseCase = chapter;
    }
    async addChapter(req, res) {
        try {
            const { title, id, order, description } = req.body;
            const addedResponse = await this.chapterUseCase.createChapter(title, id, order, description);
            if (addedResponse) {
                res.status(200).json(addedResponse);
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    async getChapter(req, res) {
        try {
            const courseId = req.query.id;
            const chapters = await this.chapterUseCase.getChapters(courseId);
            res.status(200).json(chapters);
        }
        catch (error) {
            console.log(error);
        }
    }
    async updateChapter(req, res) {
        try {
            console.log(req.body);
            const { title, order, _id } = req.body;
            const response = await this.chapterUseCase.updateChapter(_id, title, order);
            if (response?.status) {
                res.status(200).json(response);
            }
            else {
                res.status(401).json(response);
            }
        }
        catch (error) {
            console.log(error);
        }
    }
}
exports.default = ChapterController;
