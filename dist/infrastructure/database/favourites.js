"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const favouriteSchema = new mongoose_1.Schema({
    studentId: {
        type: String,
        required: true
    },
    favourites: [
        {
            type: String,
            ref: "course",
        },
    ],
});
const favouriteModel = (0, mongoose_1.model)("favourite", favouriteSchema);
exports.default = favouriteModel;
