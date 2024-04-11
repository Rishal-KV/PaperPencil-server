import student from "../../domain/student";

interface IStudentRepo{
    findStudentByEMail(email:string):Promise<student | null>
    saveStudentToDatabase(student:student):Promise<student | void| null >
    fetchStudentData(email:string):Promise<student|null>
    verifyStudent(email:string):Promise<any>
    saveGoogleAuth(credential:student):Promise<student>
    updateById(id:string):Promise<void>
    
}

export default IStudentRepo