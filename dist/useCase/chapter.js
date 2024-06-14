"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ChapterUseCase {
    chapterRepo;
    constructor(chapter) {
        this.chapterRepo = chapter;
    }
    async createChapter(chapter, id, order, description) {
        let chapterSaved = await this.chapterRepo.createChapter(chapter, order, id, description);
        if (chapterSaved) {
            return { chapterSaved, message: "chapter added" };
        }
        else {
            return { status: false };
        }
    }
    async getChapters(id) {
        try {
            let chapters = await this.chapterRepo.getChapterById(id);
            return { chapters: chapters };
        }
        catch (error) {
            console.log(error);
        }
    }
    async updateChapter(id, title, order) {
        try {
            let response = await this.chapterRepo.editChapter(id, title, order);
            if (response) {
                return { status: true, message: "chapter updated successfully" };
            }
            else {
                return { status: false, message: "failed to update chapter" };
            }
        }
        catch (error) {
            console.log(error);
        }
    }
}
exports.default = ChapterUseCase;
