import FavouriteUseCase from "../../useCase/favouriteUseCase";
import { Request, Response } from "express";
class FavouriteController {
  private favourite: FavouriteUseCase;
  constructor(favourite: FavouriteUseCase) {
    this.favourite = favourite;
  }

  async addToFavourite(req: Request, res: Response) {
    try {
      const studentId = req.body.studentId;
    
      
      
      
      const courseId = req.body.courseId;
      const response = await this.favourite.addToFavourite(studentId, courseId);
      if (response?.status) {
        res.status(200).json(response);
      }else{
        res.status(200).json(response)
      }
    } catch (error) {
      console.log(error);
    }
  }
  async fetchFavourites(req:Request,res:Response){
    try {
        const studentId = req.query.studentId as string;
        console.log(studentId,"sssss");
        
        const response = await this.favourite.fetchFavourites(studentId);
        if (response?.status) {
            res.status(200).json(response)
        }else{
            res.status(200).json(response)
        }
    } catch (error) {
       console.log(error);
        
    }
  }
}

export default FavouriteController;
