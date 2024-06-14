import { model, Schema, Types } from "mongoose";
import Chat from "../../domain/chat";

const chatSchema = new Schema(
  {
    members: [{type: Types.ObjectId, require: true }],
    latestMessage : {
      type : String,
      default : ""
    }
  },
  
 

  { timestamps: true }
);

const chatModel = model<Chat>("Chat", chatSchema);
export default chatModel;
