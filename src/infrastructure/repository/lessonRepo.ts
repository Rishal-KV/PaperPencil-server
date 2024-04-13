import Lesson from "../../domain/lessons";
import Ilesson from "../../useCase/interface/Ilesson";
import lessonModel from "../database/lessons";
class LessonRepo implements Ilesson{
    addLesson(lessonUrl:string,title:string): Promise<Lesson> {
        try {
            let saveLesson = lessonModel.create({
                title : title,
                videoUrl : lessonUrl
            })
            return saveLesson
        } catch (error) {
            throw error
        }
         
         
    }
}
export default LessonRepo