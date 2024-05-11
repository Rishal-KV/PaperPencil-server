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
}

export default IEnrolled