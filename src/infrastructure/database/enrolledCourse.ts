import { Schema, model } from "mongoose";
import EnrolledCourse from "../../domain/enrolledCourse";
const enrolledCourseSchema = new Schema<EnrolledCourse>({
  course: {
    ref: "course",
    type: String,
  },
  studentId: {
    ref: "student",
    type: String,
  },
  enrolled: {
    type: Date,
    default: Date.now,
  },
  completedLessons: [
    {
      type: String,
      ref: "Lesson",
    },
  ],
  completedChapters: [
    {
      type: String,
      ref: "Chapter",
    },
  ],
  attendedQuestions: [
    {
      type: String,
    },
  ],

  completedDate: {
    type: Date,
    default : 0
  },
  courseStatus: {
    type : Boolean,
    default : false
  }
});

const enrolledCourseModel = model<EnrolledCourse>(
  "enrolledcourse",
  enrolledCourseSchema
);
export default enrolledCourseModel;
