"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ChatController {
    chatUseCase;
    constructor(chatUseCase) {
        this.chatUseCase = chatUseCase;
    }
    async fetchChatList(req, res) {
        try {
            const studentId = req.query.studentId;
            const response = await this.chatUseCase.fetchChats(studentId);
            res.status(200).json(response);
        }
        catch (error) {
            console.log(error);
        }
    }
    async fetchConversation(req, res) {
        try {
            const conversationId = req.query.conversationId;
            const response = await this.chatUseCase.fetchConversation(conversationId);
            if (response && response.status) {
                res.status(200).json(response);
            }
            else {
                res.status(200).json(response);
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    async fetchInstructorChats(req, res) {
        try {
            const instructorId = req.query.instructorId;
            const response = await this.chatUseCase.fetchINstructorChats(instructorId);
            res.status(200).json(response);
        }
        catch (error) {
            console.log(error);
        }
    }
}
exports.default = ChatController;
