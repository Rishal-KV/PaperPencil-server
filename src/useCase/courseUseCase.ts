import Icourse from "./interface/ICourse";
import Course from "../domain/course";
import Jwt from "../infrastructure/utils/Jwt";
class CourseUseCase {
  private courseRepo: Icourse;
  private Jwt : Jwt
  constructor(courseRepo: Icourse,jwt:Jwt) {
    this.courseRepo = courseRepo;
       this.Jwt = jwt
  }

  async saveCourse(course: Course,Instructor:string ) {
 
    
    try {
        
            let instructor =  this.Jwt.verifyToken(Instructor)
            console.log(instructor);
            
            if (instructor) {
                let courseSaved  = await this.courseRepo.saveCourseToDataBase(course,instructor.id);
                if (courseSaved) {
                    return {status :true, message : "course added successfuly"}
                }else{
                    return {status : false, message : "failed to add course"}
                }
            }
        
       
        
      
    } catch (error) {
        throw error
    }
  }
  async fetchCourseData(){
    try {
      let courseData = await this.courseRepo.fetchCourse();
      return courseData
    } catch (error) {
      throw error
    }
  }
}


export default CourseUseCase;
