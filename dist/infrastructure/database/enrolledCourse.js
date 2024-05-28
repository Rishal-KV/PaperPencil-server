"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const enrolledCourseSchema = new mongoose_1.Schema({
    course: {
        ref: "course",
        type: String,
    },
    studentId: {
        ref: "student",
        type: String,
    },
    enrolled: {
        type: Date,
        default: Date.now,
    },
    completedLessons: [
        {
            type: String,
            ref: "Lesson",
        },
    ],
    completedChapters: [
        {
            type: String,
            ref: "Chapter",
        },
    ],
    attendedQuestions: [
        {
            type: String,
        },
    ],
    completedDate: {
        type: Date,
        default: 0
    },
    courseStatus: {
        type: Boolean,
        default: false
    }
});
const enrolledCourseModel = (0, mongoose_1.model)("enrolledcourse", enrolledCourseSchema);
exports.default = enrolledCourseModel;
