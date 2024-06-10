import Course from "../../domain/course"
interface Icourse {
  saveCourseToDataBase(course:Course,instructor:string):Promise<Boolean>
  fetchCourseById(id:string, limit:number,skip:number,page:number):Promise<{course:Course[], page:number, totalPage:number} | null>
  fetchCourse(search?:string, category?:string,price?:string,limit?:number,skip?:number,page?:number):Promise<{courses:Course[],totalPages:number,page:number }| null>
  updateById(id:string):Promise<boolean>
  courseAction(id:string):Promise<boolean>
  courseList(id:string):Promise<boolean>
  fetchSpecificCourse(id:string):Promise<Course | null>
  updateCourse(courseId:string,course:Course):Promise<boolean>
 


}
export default Icourse;