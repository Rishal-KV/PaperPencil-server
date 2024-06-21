import ChapterUseCase from "../../useCase/chapter";
import { Request, Response } from "express";

class ChapterController {
  private chapterUseCase: ChapterUseCase;
  constructor(chapter: ChapterUseCase) {
    this.chapterUseCase = chapter;
  }
  async addChapter(req: Request, res: Response) {
    try {
      const { title, id,order,description } = req.body;
      
      
      const addedResponse = await this.chapterUseCase.createChapter(title, id,order,description);

      if (addedResponse) {
        res.status(200).json(addedResponse);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getChapter(req: Request, res: Response) {
    try {
      const courseId = req.query.id as string;

      const chapters = await this.chapterUseCase.getChapters(courseId);

      res.status(200).json(chapters);
    } catch (error) {
      console.log(error);
    }
  }

  async updateChapter(req:Request,res:Response){
    try {
      console.log(req.body);
      
      const {title,order,_id} = req.body;
      const response = await this.chapterUseCase.updateChapter(_id,title,order);
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
