import Favourites from "../../domain/favourites";
import IFavourite from "../../useCase/interface/IFavourite";
import favouriteModel from "../database/favourites";
class FavouriteRepo implements IFavourite {
  async addToFavourite(studentId: string, courseId: string): Promise<boolean> {
    try {
      const favouriteFound = await favouriteModel.findOne({
        studentId: studentId,
      });
      if (favouriteFound) {
        if (favouriteFound.favourites.includes(courseId)) {
          await favouriteModel.updateOne(
            { studentId },
            { $pull: { favourites: courseId } }
          );
          return false
        }else{
          await favouriteModel.updateOne(
            { studentId },
            { $push: { favourites: courseId } }
          );
        }
        return true
      }else {
      
        await favouriteModel.create({
          studentId,
          favourites: [courseId],
        });
       return true
      }
    } catch (error) {
      throw error;
    }
  }

  async fetchFavourites(studentId: string): Promise<Favourites | null> {
    try {
      const favourites = await favouriteModel.findOne({ studentId: studentId }).populate('favourites').exec();
      if (favourites) {
        return favourites;
      } else {
        return null;
      }
    } catch (error) {
      throw error;
    }
  }
}

export default FavouriteRepo;
