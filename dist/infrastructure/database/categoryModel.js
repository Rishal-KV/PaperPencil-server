"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const categorySchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    is_blocked: {
        type: Boolean,
        default: false
    }
});
categorySchema.index({ name: 1 }, { unique: true, collation: { locale: 'en', strength: 2 } });
let categoryModel = (0, mongoose_1.model)('category', categorySchema);
exports.default = categoryModel;
