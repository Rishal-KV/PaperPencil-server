import { Schema, model } from "mongoose";
import Review from "../../domain/review";
let reveiwSchema = new Schema<Review>({
  courseId: {
    type: String,
    required: true,
  },
  reviews: [
    {
      studentId: {
        type: String,
        ref: "student",
      },
      reviewText: {
        type:String,
        required:true,
        
      },
      rating : {
            type : Number
      },
      createdAt : {
         type: Date, default: Date.now 
      }
    },
  ],
});

const reviewModel = model<Review>('reviews',reveiwSchema);
export default reviewModel