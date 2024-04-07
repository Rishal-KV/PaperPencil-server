import mongoose,{model,Schema} from "mongoose";
const courseSchema = new Schema({
    instructor : {
        type : String,
        ref : "instructor"
    },
    name : {
        type : String,
        require : true
    },
    category  :{
        type : String,
        ref : 'category',
        require : true
    },
    image : {
        type :String,
        require : true
    },
    price : {
        type: Number,
        require : true,

    },
    description :{ 
        type : String,
        require : true
    },
    chapters : [
        {
            type : String,
            ref : "chapter"
        }
    ],
    approved :{
        type : Boolean,
        default : false
    },

    listed : {
        type:Boolean,
        default:false
    }
})
const courseModel = model('course',courseSchema)
export default courseModel;