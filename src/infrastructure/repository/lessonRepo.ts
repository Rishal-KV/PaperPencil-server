import Lesson from "../../domain/lessons";
import Ilesson from "../../useCase/interface/Ilesson";
import lessonModel from "../database/lessons";
class LessonRepo implements Ilesson {
  addLesson(lessonUrl: string, title: string): Promise<Lesson> {
    try {
      const saveLesson = lessonModel.create({
        title: title,
        videoUrl: lessonUrl,
      });
      return saveLesson;
    } catch (error) {
      throw error;
    }
  }
  async deleteLesson(id: string): Promise<boolean> {
    try {
        console.log(id);
        
      let deleted = await lessonModel.deleteOne({ _id: id });
      if (deleted) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw error;
    }
  }
}
export default LessonRepo;
