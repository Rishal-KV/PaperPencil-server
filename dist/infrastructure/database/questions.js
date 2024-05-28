"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const questionSchema = new mongoose_1.Schema({
    question: {
        type: String,
        required: true
    },
    options: {
        type: [String],
        required: true
    },
    correctOption: {
        type: Number,
        required: true
    },
    courseId: {
        type: String,
        required: true
    }
});
const questionModel = (0, mongoose_1.model)('question', questionSchema);
exports.default = questionModel;
