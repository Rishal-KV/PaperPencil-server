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
        await favouriteModel.findByIdAndUpdate(
          { studentId: studentId },
          {
            $push: { favourites: courseId },
          }
        );
        return true;
      } else {
        favouriteModel.create({
          studentId: studentId,
          favourites: [courseId],
        });
        return true;
      }
    } catch (error) {
      throw error;
    }
  }

  async fetchFavourites(studentId: string): Promise<Favourites | null> {
    try {
      const favourites = await favouriteModel.findOne({ studentId: studentId });
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
