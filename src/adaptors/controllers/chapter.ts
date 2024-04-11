import ChapterUseCase from "../../useCase/chapter";
import { Request,Response } from "express";
import Chapter from "../../domain/chapter";
class ChapterController {
  private chapterUseCase : ChapterUseCase
  constructor(chapter:ChapterUseCase){
    this.chapterUseCase = chapter
  }
  async addChapter(req:Request,res:Response){
    try {

        
        let {title,id} = req.body
        let addedResponse = await this.chapterUseCase.createChapter(title,id);
        if (addedResponse) {
            res.status(100).json(addedResponse)
        }
    } catch (error) {
        console.log(error);
        
    }
  }

  async getChapter(req:Request,res:Response){
    try {
        let courseId = req.query.id as string
        console.log(courseId);
        
        let chapters = await this.chapterUseCase.getChapters(courseId);
        res.status(100).json(chapters)
    } catch (error) {
        console.log(error);
        
    }
  }
}
export default ChapterController