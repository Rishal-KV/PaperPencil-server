"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeSocket = void 0;
const socket_io_1 = require("socket.io");
const message_1 = __importDefault(require("../database/message"));
const chat_1 = __importDefault(require("../database/chat"));
const initializeSocket = (server) => {
    const io = new socket_io_1.Server(server, {
        cors: {
            origin: "*",
        },
    });
    io.on("connection", (socket) => {
        socket.on("join", ({ userId }) => {
            socket.join(userId);
        });
        socket.on("sendMessage", async ({ text, sender, receiver }) => {
            try {
                console.log(sender, "okk", receiver);
                const conversation = await chat_1.default.findOne({
                    members: { $all: [sender, receiver] },
                });
                if (conversation) {
                    const newMessage = await message_1.default.create({
                        to: receiver,
                        from: sender,
                        conversationId: conversation?._id.toString(),
                        text: text,
                    });
                    if (newMessage) {
                        io.to(sender).emit("newMessage", { newMessage });
                        io.to(receiver).emit("newMessage", { newMessage });
                    }
                }
                console.log("Message sent successfully.");
            }
            catch (error) {
                console.error("Error sending message:", error);
            }
        });
    });
};
exports.initializeSocket = initializeSocket;
