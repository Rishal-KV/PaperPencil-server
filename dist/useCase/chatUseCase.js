"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ChatUseCase {
    chatRepo;
    constructor(chatRepo) {
        this.chatRepo = chatRepo;
    }
    async fetchChats(studentId) {
        const response = await this.chatRepo.fetchStudentChats(studentId);
        return { chatList: response };
    }
    async fetchConversation(conversationId) {
        try {
            const response = await this.chatRepo.fetchConversation(conversationId);
            if (response) {
                return { response, status: true };
            }
            else {
                return { response, status: false };
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    async fetchINstructorChats(instructor) {
        try {
            const response = await this.chatRepo.fetchInstructorChats(instructor);
            return { chatList: response };
        }
        catch (error) {
            console.log(error);
        }
    }
}
exports.default = ChatUseCase;
