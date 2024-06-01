"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FavouriteUseCase {
    favourite;
    constructor(favouriteRepo) {
        this.favourite = favouriteRepo;
    }
    async addToFavourite(studentId, courseId) {
        try {
            const added = await this.favourite.addToFavourite(studentId, courseId);
            if (added) {
                return { status: true, message: "added to favourites" };
            }
            else {
                return { status: false, message: "removed from favourites" };
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    async fetchFavourites(studentId) {
        try {
            const response = await this.favourite.fetchFavourites(studentId);
            if (response) {
                return { status: true, favourites: response };
            }
            else {
                return { status: false, favourites: null };
            }
        }
        catch (error) {
            console.log(error);
        }
    }
}
exports.default = FavouriteUseCase;
