import Message from "../../domain/message"
interface IChat {
    fetchStudentChats(student:string):Promise<any>
    fetchConversation(converstaionId:string):Promise<Message[] | null>
    fetchInstructorChats(instructor:string):Promise<any>
}

export default IChat