import ChatRepo from "../infrastructure/repository/chatRepo";
class ChatUseCase {
    private chatRepo:ChatRepo
    constructor(chatRepo:ChatRepo){
        this.chatRepo = chatRepo
    }

    async fetchChats(studentId:string){
        
        const response = await this.chatRepo.fetchStudentChats(studentId);
        return { chatList : response}
    }

    async fetchConversation(conversationId:string) {
        try {
            const response = await this.chatRepo.fetchConversation(conversationId);
            if (response) {
                return {response,status:true}
            }else{
                return {response,status:false}
            }
        } catch (error) {
            console.log(error);
            
        }
    }

    async fetchINstructorChats(instructor:string) {
        try {
            const response = await this.chatRepo.fetchInstructorChats(instructor);
            return {chatList:response}
        } catch (error) {
            console.log(error);
            
        }
    }
}

export default ChatUseCase