"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const favourites_1 = __importDefault(require("../database/favourites"));
class FavouriteRepo {
    async addToFavourite(studentId, courseId) {
        try {
            const favouriteFound = await favourites_1.default.findOne({
                studentId: studentId,
            });
            if (favouriteFound) {
                if (favouriteFound.favourites.includes(courseId)) {
                    await favourites_1.default.updateOne({ studentId }, { $pull: { favourites: courseId } });
                    return false;
                }
                else {
                    await favourites_1.default.updateOne({ studentId }, { $push: { favourites: courseId } });
                }
                return true;
            }
            else {
                await favourites_1.default.create({
                    studentId,
                    favourites: [courseId],
                });
                return true;
            }
        }
        catch (error) {
            throw error;
        }
    }
    async fetchFavourites(studentId) {
        try {
            const favourites = await favourites_1.default.findOne({ studentId: studentId }).populate('favourites').exec();
            if (favourites) {
                return favourites;
            }
            else {
                return null;
            }
        }
        catch (error) {
            throw error;
        }
    }
}
exports.default = FavouriteRepo;
