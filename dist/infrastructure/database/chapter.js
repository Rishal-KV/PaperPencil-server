"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ChapterSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    lessons: [
        {
            type: String,
            ref: "Lesson",
        },
    ],
    course: {
        type: String,
        ref: "course",
    },
    order: {
        type: Number,
        require: true,
    },
    description: {
        type: String,
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
const chapterModel = (0, mongoose_1.model)("Chapter", ChapterSchema);
exports.default = chapterModel;
