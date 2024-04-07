import Course from "../../domain/course"
interface Icourse {
  saveCourseToDataBase(course:Course,instructor:string):Promise<Boolean>
  fetchCourse()
}
export default Icourse;