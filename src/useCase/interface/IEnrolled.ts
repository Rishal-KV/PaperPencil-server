interface IEnrolled{
    purchaseCourse(studentId:string,courseId:string):Promise<boolean | {message:string}>
    checkEnroll(studentId:string,courseId:string):Promise<boolean>
}

export default IEnrolled