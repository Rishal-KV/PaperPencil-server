"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FavouriteController {
    favourite;
    constructor(favourite) {
        this.favourite = favourite;
    }
    async addToFavourite(req, res) {
        try {
            const studentId = req.body.studentId;
            const courseId = req.body.courseId;
            const response = await this.favourite.addToFavourite(studentId, courseId);
            if (response?.status) {
                res.status(200).json(response);
            }
            else {
                res.status(200).json(response);
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    async fetchFavourites(req, res) {
        try {
            const studentId = req.query.studentId;
            console.log(studentId, "sssss");
            const response = await this.favourite.fetchFavourites(studentId);
            if (response?.status) {
                res.status(200).json(response);
            }
            else {
                res.status(200).json(response);
            }
        }
        catch (error) {
            console.log(error);
        }
    }
}
exports.default = FavouriteController;
