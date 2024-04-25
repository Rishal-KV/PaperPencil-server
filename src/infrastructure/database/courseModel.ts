import mongoose, { model, Schema } from "mongoose";
import Course from "../../domain/course";
const courseSchema = new Schema<Course>({
  instructor: {
    type: String,
    ref: "instructor",
  },
  name: {
    type: String,
    require: true,
  },
  category: {
    type: String,
    ref: "category",
    require: true,
  },
  image: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },

  approved: {
    type: Boolean,
    default: false,
  },

  listed: {
    type: Boolean,
    default: true,
  },
  publish: {
    type: Boolean,
    default: false,
  },
});
const courseModel = model<Course>("course", courseSchema);
export default courseModel;
