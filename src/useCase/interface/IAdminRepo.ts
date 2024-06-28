import Admin, { CompleteMonthlySales } from "../../domain/admin"
import Instructor from "../../domain/instructor"
import student from "../../domain/student"
import Course from "../../domain/course"
interface IAdminRepo{
    findAdminByEmail(email:string):Promise<Admin | null | void>
    findStudentData(limit:number,skip:number,page:number): Promise<{student:student[],page:number,totalPage:number} | null>
    findInstructorData(limit:number,skip:number,page:number):Promise<{instructor:Instructor[],page:number,totalPage:number} | null>
    blockInstructor(id:string):Promise<boolean>
    blockStudent(id:string):Promise<boolean>
    fetchCourse(limit:number,skip:number,page:number):Promise<{course:Course[], page:number, totalPage:number} | null>
    fetchProfit():Promise<CompleteMonthlySales[]>
   
}

export default IAdminRepo