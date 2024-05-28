"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ChapterController {
    chapterUseCase;
    constructor(chapter) {
        this.chapterUseCase = chapter;
    }
    async addChapter(req, res) {
        try {
            let { title, id, order, description } = req.body;
            let addedResponse = await this.chapterUseCase.createChapter(title, id, order, description);
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
            let courseId = req.query.id;
            let chapters = await this.chapterUseCase.getChapters(courseId);
            res.status(200).json(chapters);
        }
        catch (error) {
            console.log(error);
        }
    }
    async updateChapter(req, res) {
        try {
            console.log(req.body);
            let { title, order, id } = req.body;
            let response = await this.chapterUseCase.updateChapter(id, title, order);
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
