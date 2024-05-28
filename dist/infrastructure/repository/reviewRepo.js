"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const review_1 = __importDefault(require("../database/review"));
class ReviewRepo {
    async addReview(reviewData, studentId) {
        try {
            const { courseId, review, rating } = reviewData;
            const reviewAdded = await review_1.default.findOne({
                courseId: reviewData.courseId,
            });
            if (reviewAdded) {
                await review_1.default.findOneAndUpdate({ courseId: courseId }, {
                    $push: {
                        reviews: {
                            studentId: studentId,
                            reviewText: review,
                            rating: rating,
                        },
                    },
                });
                return { review: true };
            }
            else {
                await review_1.default.create({
                    courseId: courseId,
                    reviews: [
                        {
                            studentId: studentId,
                            reviewText: review,
                            rating: rating,
                        },
                    ],
                });
                return { review: true };
            }
        }
        catch (error) {
            throw error;
        }
    }
    async checkReview(studentId, courseId) {
        // console.log(studentId, courseId, + "oooo");
        console.log(courseId, "repoo");
        try {
            const reviewed = await review_1.default.findOne({ courseId: courseId }, {
                reviews: { $elemMatch: { studentId: studentId } },
            });
            if (reviewed?.reviews && reviewed.reviews.length > 0) {
                return true;
            }
            else {
                return false;
            }
        }
        catch (error) {
            throw error;
        }
    }
    async fetchReview(courseId) {
        try {
            const reviews = await review_1.default
                .findOne({ courseId: courseId })
                .populate("reviews.studentId");
            if (reviews) {
                return reviews;
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
exports.default = ReviewRepo;
