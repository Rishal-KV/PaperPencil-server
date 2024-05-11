import mongoose from "mongoose";
interface Message {
  to: string;
  from: string;
  text: string;
  conversationId : string
}
export default Message