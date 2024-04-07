import Admin from "../../domain/admin"
import Instructor from "../../domain/instructor"
import student from "../../domain/student"
interface IAdminRepo{
    findAdminByEmail(email:string):Promise<Admin | null | void>
    findStudentData(): Promise<student[]>
    findInstructorData()
    blockInstructor(id:string):Promise<boolean>
    blockStudent(id:string):Promise<boolean>
   
}

export default IAdminRepo