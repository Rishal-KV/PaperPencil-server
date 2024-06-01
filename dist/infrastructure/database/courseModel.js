"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const courseSchema = new mongoose_1.Schema({
    instructor: {
        type: String,
        ref: "instructor",
    },
    name: {
        type: String,
        require: true,
    },
    category: {
        type: String,
        ref: "category",
        require: true,
    },
    image: {
        type: String,
        require: true,
    },
    price: {
        type: Number,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    approved: {
        type: Boolean,
        default: false,
    },
    listed: {
        type: Boolean,
        default: true,
    },
    publish: {
        type: Boolean,
        default: false,
    },
    questions: [
        {
            type: String,
            ref: "question",
        },
    ],
});
const courseModel = (0, mongoose_1.model)("course", courseSchema);
exports.default = courseModel;
