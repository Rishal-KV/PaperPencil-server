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

    fetchCourse(){
        try {
            let course = courseModel.find();
            if (course) {
                return course
            }
        } catch (error) {
            throw error
        }
    }
}

export default CourseRepo