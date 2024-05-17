import FavouriteRepo from "../infrastructure/repository/favouriteRepo";
class FavouriteUseCase {
  private favourite: FavouriteRepo;
  constructor(favouriteRepo: FavouriteRepo) {
    this.favourite = favouriteRepo;
  }

  async addToFavourite(studentId: string, courseId: string) {
    try {
      const added = await this.favourite.addToFavourite(studentId, courseId);
      if (added) {
        return { status: true, message: "added to favourites" };
      }
    } catch (error) {
      console.log(error);
    }
  }
  async fetchFavourites(studentId: string) {
    try {
      const response = await this.favourite.fetchFavourites(studentId);
      if (response) {
        return { status: true, favourites: response };
      } else {
        return { status: false, favourites: null };
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export default FavouriteUseCase;
