import Course from "./course";
import Student from "./student";
interface EnrolledCourse {
  course: string;
  studentId: string;

  enrolled:Date;
  completedChapters:[]
  completedLessons:[];
  attendedQuestions :[]
  completedDate : Date
  courseStatus:boolean
  
}
export default EnrolledCourse;


export interface Response {
  studentId: Student;
  course: Course;
  completedDate: Date;
}

export interface IsCourseCompleted {
  response?: Response;
}

