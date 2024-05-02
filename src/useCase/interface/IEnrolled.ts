import EnrolledCourse from "../../domain/enrolledCourse"
interface IEnrolled{
    purchaseCourse(studentId:string,courseId:string):Promise<boolean | {message:string}>
    checkEnroll(studentId:string,courseId:string):Promise<boolean>
    fetchEnrolledCourse(studentId:string):Promise<EnrolledCourse[]| null>
}

export default IEnrolled