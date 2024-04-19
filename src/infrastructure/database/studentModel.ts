import mongoose, { Schema, model } from "mongoose";
import student from "../../domain/student";

const studentSchema: Schema<student> = new Schema({
    name: {
        type: String,
        required: true

    },
    email: {
        type: String,
        required: true

    },
    profileImage : {
       type : String
    },
    password: {
        type: String,
    
    },
    is_blocked: {
        type: Boolean,
        default: false
    },
    number : {
        type : Number
    },
    is_Verified : {
        type: Boolean,
        default : false
    },
    about: {
        type: String
    },
    googleId:{
        type : String
    }

})

const studentModel = model<student>('student', studentSchema);

export default studentModel;

