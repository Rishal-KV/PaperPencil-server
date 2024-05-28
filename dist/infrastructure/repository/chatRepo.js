"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chat_1 = __importDefault(require("../database/chat"));
const mongoose_1 = require("mongoose");
const message_1 = __importDefault(require("../database/message"));
class chatRepo {
    async fetchStudentChats(student) {
        const studentId = new mongoose_1.Types.ObjectId(student);
        const chats = await chat_1.default.aggregate([
            {
                $match: {
                    "members.0": studentId,
                },
            },
            {
                $lookup: {
                    from: "instructors",
                    localField: "members.1",
                    foreignField: "_id",
                    as: "instructorDetails",
                },
            },
            {
                $unwind: "$instructorDetails",
            },
        ]);
        return chats;
    }
    async fetchConversation(converstaionId) {
        const conversations = await message_1.default.find({
            conversationId: converstaionId,
        });
        if (conversations) {
            return conversations;
        }
        else {
            return null;
        }
    }
    async fetchInstructorChats(instructor) {
        const instructorId = new mongoose_1.Types.ObjectId(instructor);
        const chats = await chat_1.default.aggregate([
            {
                $match: {
                    "members.1": instructorId,
                },
            },
            {
                $lookup: {
                    from: "students",
                    localField: "members.0",
                    foreignField: "_id",
                    as: "studentDetails",
                },
            },
            {
                $unwind: "$studentDetails",
            },
        ]);
        return chats;
    }
}
exports.default = chatRepo;
