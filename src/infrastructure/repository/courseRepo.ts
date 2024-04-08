import Icourse from "../../useCase/interface/ICourse";
import Course from "../../domain/course";
import courseModel from "../database/courseModel";


class CourseRepo implements Icourse {

    async saveCourseToDataBase(course: Course,instructor:string): Promise<Boolean> {
        try {
            console.log(instructor);
            
            let { name, price, description, chapters,image } = course
            let saved = await courseModel.create({
                instructor : instructor,
                name: name,
                price: price,
                description: description,
                image : image,
                chapters: chapters,

            })
            if (saved) {
                return true
            } else {
                return false
            }
        } catch (error) {
            throw error
        }
    }

  async fetchCourseById(id: string): Promise<Course[] | null> {
      try {
        let course = await courseModel.find({instructor:id})
         if (course) {
            return course
         }else{
            return null
         }
      } catch (error) {
         throw error
      }
  }

  async fetchCourse(): Promise<Course[] | null> {
    try {
        let course = await courseModel.find();
        return course
    } catch (error) {
        throw error
    }
     

  }


}

export default CourseRepo