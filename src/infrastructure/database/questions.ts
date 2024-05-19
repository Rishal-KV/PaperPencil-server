import { Schema, model } from "mongoose";
import Question from "../../domain/questions";

const questionSchema = new Schema<Question>({
 question : {
    type : String,
    required : true
 },
 options : {
    type : [String],
    required : true
 },
 correctOption : {
    type : Number,
    required : true
 },
courseId : {
    type:String,
    required : true
}
})

const questionModel = model('question',questionSchema);
export default questionModel