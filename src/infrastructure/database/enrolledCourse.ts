import { Schema, model } from "mongoose";
import EnrolledCourse from "../../domain/enrolledCourse";
const enrolledCourseSchema = new Schema({
  course: {
    ref: "course",
    type: String,
  },
  studentId: {
    ref: "student",
    type: String,
  },
  
});

const enrolledCourseModel = model<EnrolledCourse>("enrolledcourse", enrolledCourseSchema);
export default enrolledCourseModel;
