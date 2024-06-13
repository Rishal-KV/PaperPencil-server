import chatModel from "../database/chat";
import IChat from "../../useCase/interface/IChat";
import { Types } from "mongoose";
import messageModel from "../database/message";
import Message from "../../domain/message";
class chatRepo implements IChat {
  async fetchStudentChats(student: string): Promise<any> {
    const studentId = new Types.ObjectId(student);
    const chats = await chatModel.aggregate([
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
      {
        $sort: {
          updatedAt: -1, 
        },
      },
    ]);
    return chats;
  }

  async fetchConversation(converstaionId: string): Promise<Message[] | null> {
    const conversations = await messageModel.find({
      conversationId: converstaionId,
    });
    if (conversations) {
      return conversations;
    } else {
      return null;
    }
  }

  async fetchInstructorChats(instructor: string): Promise<any> {
    const instructorId = new Types.ObjectId(instructor);
    const chats = await chatModel.aggregate([
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
      {
        $sort: {
          updatedAt: -1, 
        },
      },
    ]);
    
    return chats;
  }
}

export default chatRepo;
