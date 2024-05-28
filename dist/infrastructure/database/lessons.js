"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const LessonSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    videoUrl: {
        type: String,
        required: true,
    },
    chapter: {
        type: String,
        ref: 'Chapter',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
const lessonModel = (0, mongoose_1.model)('Lesson', LessonSchema);
exports.default = lessonModel;
