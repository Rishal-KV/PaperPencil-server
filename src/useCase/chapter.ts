import ChapterRepo from "../infrastructure/repository/chapterRepo";
import Chapter from "../domain/chapter";
class ChapterUseCase {
  private chapterRepo: ChapterRepo;
  constructor(chapter: ChapterRepo) {
    this.chapterRepo = chapter;
  }
  async createChapter(chapter: string, id: string) {
    let chapterSaved = await this.chapterRepo.createChapter(chapter, id);
    if (chapterSaved) {
      return { status: true };
    } else {
      return { status: false };
    }
  }
  async getChapters(id:string) {
    try {
        let chapters = this.chapterRepo.getChapterById(id);
        return chapters
    } catch (error) {
        console.log(error);
        
    }
  }
}

export default ChapterUseCase;
