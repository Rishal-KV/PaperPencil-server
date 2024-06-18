import EnrolledCourse from "../../domain/enrolledCourse"
import InstructorIncome from "../../domain/instructorIncome"
interface IEnrolled{
    purchaseCourse(studentId:string,courseId:string):Promise<boolean | {message:string}>
    checkEnroll(studentId:string,courseId:string):Promise<boolean>
    fetchEnrolledCourse(studentId:string):Promise<EnrolledCourse[]| null>
    fetchEnrollments(courseId:string):Promise<EnrolledCourse[] | null>
    profitCalc(isnrtuctorId:string):Promise<InstructorIncome[]>
    saveProgress(courseId:string, lessonId:string,studentId:string):Promise<void>
    checkProgress(studentId:string,courseId:string):Promise<EnrolledCourse| null>
    createChat(studentId:string,instructorId:string):Promise<boolean>
    fetchMonthlySales(instructorId:string):Promise <any>
    saveCourseProgress(courseId:string,studentId:string,date:Date):Promise<void>
    isCourseCompleted(courseId:string,stuentId:string):Promise<EnrolledCourse|null>
    courseData(courseId:string,studentId:string):Promise<EnrolledCourse|null>
    checkPayment(courseId:string, scourseId:string):Promise<boolean>
  
}

export default IEnrolled