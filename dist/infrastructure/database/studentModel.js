"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const studentSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    profileImage: {
        type: String
    },
    password: {
        type: String,
    },
    is_blocked: {
        type: Boolean,
        default: false
    },
    number: {
        type: Number
    },
    is_Verified: {
        type: Boolean,
        default: false
    },
    about: {
        type: String
    },
    googleId: {
        type: String
    }
});
const studentModel = (0, mongoose_1.model)('student', studentSchema);
exports.default = studentModel;
