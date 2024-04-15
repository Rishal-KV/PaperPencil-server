import Admin from "../../domain/admin"
import Instructor from "../../domain/instructor"
import student from "../../domain/student"
import Course from "../../domain/course"
interface IAdminRepo{
    findAdminByEmail(email:string):Promise<Admin | null | void>
    findStudentData(): Promise<student[]>
    findInstructorData()
    blockInstructor(id:string):Promise<boolean>
    blockStudent(id:string):Promise<boolean>
    fetchCourse():Promise<Course[] | null>
   
}

export default IAdminRepo