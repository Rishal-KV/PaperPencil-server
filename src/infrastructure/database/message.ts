import { Schema, model } from "mongoose";;
import Message from "../../domain/message";
const messageSchema = new Schema<Message>({
    to: {
        type:String,
        
    },
    from : {
        type :String,

    },

    conversationId : {
       type :String
    },
    text: {
        type : String
    }
   
     
},{timestamps : true})

const messageModel = model('message', messageSchema);
export default messageModel