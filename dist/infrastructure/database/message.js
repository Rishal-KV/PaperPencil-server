"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
;
const messageSchema = new mongoose_1.Schema({
    to: {
        type: String,
    },
    from: {
        type: String,
    },
    conversationId: {
        type: String
    },
    text: {
        type: String
    }
}, { timestamps: true });
const messageModel = (0, mongoose_1.model)('message', messageSchema);
exports.default = messageModel;
