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
    const onlineUsers = new Map();
    io.on("connection", (socket) => {
        socket.on("join", ({ userId }) => {
            socket.join(userId);
        });
        socket.on("onlineStatus", (userId) => {
            console.log("onlineStatus emitted by:", userId);
            // Add the user to the online users map
            onlineUsers.set(socket.id, userId);
            // Emit the current online users to the client
            io.emit("onlineStatus", Array.from(onlineUsers.values()));
        });
        socket.on("sendMessage", async ({ text, sender, receiver }) => {
            try {
                const conversation = await chat_1.default.findOneAndUpdate({ members: { $all: [sender, receiver] } }, // Filter criteria
                { $set: { updatedAt: new Date(), latestMessage: text } }, // Update object
                { new: true } // Options to return the updated document
                );
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
        socket.on('offlineStatus', (userId) => {
            console.log('User is offline:', userId);
            // Find and remove the user from the online users map
            for (const [key, value] of onlineUsers.entries()) {
                if (value === userId) {
                    onlineUsers.delete(key);
                    break;
                }
            }
            // Emit the updated list of online users
            io.emit('onlineStatus', Array.from(onlineUsers.values()));
        });
        // Handle disconnection
        socket.on("disconnect", () => {
            // Find the user ID associated with the disconnected socket
            console.log(onlineUsers, "online users");
            const entry = Array.from(onlineUsers.entries()).find(([key]) => key === socket.id);
            if (entry) {
                const userId = entry[1];
                console.log(userId, socket.id);
                onlineUsers.delete(socket.id);
                onlineUsers.delete(userId);
                console.log(onlineUsers, "deleted users");
                // Broadcast updated online status to all clients
                io.emit("onlineStatus", Array.from(onlineUsers.keys()));
            }
            // Remove user from online users map
        });
    });
};
exports.initializeSocket = initializeSocket;
