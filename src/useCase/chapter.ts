import ChapterRepo from "../infrastructure/repository/chapterRepo";
import Chapter from "../domain/chapter";

class ChapterUseCase {
  private chapterRepo: ChapterRepo;
  constructor(chapter: ChapterRepo) {
    this.chapterRepo = chapter;
  }
  async createChapter(chapter: string, id: string,order:number) {
   
    
    let chapterSaved = await this.chapterRepo.createChapter(chapter,order,id);
    if (chapterSaved) {
      return { status: true, message:"chapter added" };
    } else {
      return { status: false };
    }
  }
  async getChapters(id: string) {
    try {
      let chapters = await this.chapterRepo.getChapterById(id);

      return { chapters: chapters };
    } catch (error) {
      console.log(error);
    }
  }

  async updateChapter(id:string,title:string,order:number){
    try {
      let response = await this.chapterRepo.editChapter(id,title,order);
      if (response) {
        return {status:true, message:"chapter updated successfully"}
      }else{
        return {status:false, message:"failed to update chapter"}
      }
    } catch (error) {
      console.log(error);
      
    }
  }

}

export default ChapterUseCase;
