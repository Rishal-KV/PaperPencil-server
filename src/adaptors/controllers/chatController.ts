import ChatUseCase from "../../useCase/chatUseCase";
import { Request, Response } from "express";
class ChatController {
  private chatUseCase: ChatUseCase;
  constructor(chatUseCase: ChatUseCase) {
    this.chatUseCase = chatUseCase;
  }

  async fetchChatList(req: Request, res: Response) {
    try {
      const studentId = req.query.studentId as string;
      const response = await this.chatUseCase.fetchChats(studentId);
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
    }
  }

  async fetchConversation(req: Request, res: Response) {
    try {
      const conversationId = req.query.conversationId as string;
      
      
      
      const response = await this.chatUseCase.fetchConversation(conversationId);
      if (response && response.status) {
        res.status(200).json(response);
      } else {
        res.status(200).json(response);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async fetchInstructorChats(req:Request, res:Response) {
    try {
      const instructorId = req.query.instructorId as string
      const response = await this.chatUseCase.fetchINstructorChats(instructorId);
      
      
      res.status(200).json(response)
    } catch (error) {
      console.log(error);
      
    }
  }
}

export default ChatController;
