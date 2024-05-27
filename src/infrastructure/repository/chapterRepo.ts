import chapterModel from "../database/chapter";
import Chapter from "../../useCase/interface/IChapter";
import chapter from "../../domain/chapter";
class ChapterRepo implements Chapter {
  async createChapter(
    chapter: string,
    order: number,
    id: string,
    description:string
  ): Promise<chapter> {
    console.log(chapter);

    try {
      let chapterAdded = await chapterModel.create({
        title: chapter,
        course: id,
        order: order,
        description:description
      });
      return chapterAdded;
    } catch (error) {
      throw error;
    }
  }
  async getChapterById(id: string): Promise<chapter[] | null> {
    let chapters = await chapterModel
      .find({ course: id })
      .populate("lessons").populate({ path: 'course', populate: { path: 'category' } })
      .sort("order");
    if (chapters) {
      return chapters;
    } else {
      return null;
    }
  }

  async insertLesson(
    id: string,
    lesson: string | null | undefined
  ): Promise<Boolean> {
    let result = await chapterModel.updateOne(
      { _id: id },
      {
        $push: { lessons: lesson },
      }
    );
    if (result) {
      return true;
    } else {
      return false;
    }
  }
  async findChapterOfCourse(id: string): Promise<chapter[]> {
    try {
      let chapters = await chapterModel.find({ course: id });
      if (chapters) {
        return chapters;
      } else {
        return [];
      }
    } catch (error) {
      throw error;
    }
  }
  async editChapter(
    id: string,
    title: string,
    order: number
  ): Promise<boolean> {
    try {
      let updated = await chapterModel.findOneAndUpdate(
        { _id: id },
        {
          title: title,
          order: order,
        }
      );
      if (updated) {
        return true
      }else{
        return false
      }
    } catch (error) {
      throw error;
    }
  }
 async  deleteLesson(chapterId: string| undefined ,lessonId:string): Promise<boolean> {
    try {
  
      
      let deleted = await chapterModel.findByIdAndUpdate(
        { _id: chapterId }, 
        { $pull: { lessons: lessonId } }, 
        { new: true } 
      );
      console.log(deleted);
      
      if (deleted) {
        return true
      }else{
        return false
      }
      
    } catch (error) {
      throw error
    }
  }
}
export default ChapterRepo;
