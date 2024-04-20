import ChapterUseCase from "../../useCase/chapter";
import { Request, Response } from "express";

class ChapterController {
  private chapterUseCase: ChapterUseCase;
  constructor(chapter: ChapterUseCase) {
    this.chapterUseCase = chapter;
  }
  async addChapter(req: Request, res: Response) {
    try {
      let { title, id,order } = req.body;
      
      
      let addedResponse = await this.chapterUseCase.createChapter(title, id,order);

      if (addedResponse) {
        res.status(200).json(addedResponse);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getChapter(req: Request, res: Response) {
    try {
      let courseId = req.query.id as string;

      let chapters = await this.chapterUseCase.getChapters(courseId);

      res.status(200).json(chapters);
    } catch (error) {
      console.log(error);
    }
  }

  async updateChapter(req:Request,res:Response){
    try {
      console.log(req.body);
      
      let {title,order,id} = req.body;
      let response = await this.chapterUseCase.updateChapter(id,title,order);
      if (response?.status) {
        res.status(200).json(response)
      }else{
        res.status(401).json(response);
      }
    } catch (error) {
      console.log(error);
      
    }
  }
 
}
export default ChapterController;
