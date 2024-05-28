"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
let reveiwSchema = new mongoose_1.Schema({
    courseId: {
        type: String,
        required: true,
    },
    reviews: [
        {
            studentId: {
                type: String,
                ref: "student",
            },
            reviewText: {
                type: String,
                required: true,
            },
            rating: {
                type: Number
            },
            createdAt: {
                type: Date, default: Date.now
            }
        },
    ],
});
const reviewModel = (0, mongoose_1.model)('reviews', reveiwSchema);
exports.default = reviewModel;
