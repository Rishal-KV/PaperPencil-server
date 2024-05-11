import Course from "../../domain/course"
interface Icourse {
  saveCourseToDataBase(course:Course,instructor:string):Promise<Boolean>
  fetchCourseById(id:string):Promise<Course[] | null>
  fetchCourse(search?:string, category?:string):Promise<Course[] | null>
  updateById(id:string):Promise<boolean>
  courseAction(id:string):Promise<boolean>
  courseList(id:string):Promise<boolean>
  fetchSpecificCourse(id:string):Promise<Course | null>
  updateCourse(courseId:string,course:Course):Promise<boolean>
 


}
export default Icourse;