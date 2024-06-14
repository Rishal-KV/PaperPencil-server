"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ReviewController {
    review;
    constructor(review) {
        this.review = review;
    }
    async addReview(req, res) {
        try {
            let review = req.body.review;
            let studentId = req.body.studentId;
            const response = await this.review.review(review, studentId);
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
    async checkReview(req, res) {
        try {
            const studentId = req.query.studentId;
            const courseId = req.query.courseId;
            const response = await this.review.checkReview(courseId, studentId);
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
    async fetchReviews(req, res) {
        try {
            const courseId = req.query.courseId;
            console.log(courseId);
            const response = await this.review.fetchReview(courseId);
            res.status(200).json(response);
        }
        catch (error) {
            console.log(error);
        }
    }
}
exports.default = ReviewController;
