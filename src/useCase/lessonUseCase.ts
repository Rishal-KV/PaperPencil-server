import LessonRepo from "../infrastructure/repository/lessonRepo";
import ChapterRepo from "../infrastructure/repository/chapterRepo";
class LessonUseCase {
  private lessonRepo: LessonRepo;
  private chapterRepo: ChapterRepo;
  constructor(lessonRepo: LessonRepo, chapterRepo: ChapterRepo) {
    this.lessonRepo = lessonRepo;
    this.chapterRepo = chapterRepo;
  }

  async addLesson(id: string, lesson: string, title: string) {
    try {
      let lessonAdded = await this.lessonRepo.addLesson(lesson, title);
      if (lessonAdded) {
        let result = await this.chapterRepo.insertLesson(id, lessonAdded._id);
        if (result) {
          return { status: true, message: "lesson added" };
        } else {
          return { status: false, message: "error adding lesson" };
        }
      } else {
        return { stats: false };
      }
    } catch (error) {
      throw error;
    }
  }
  async deleteLesson(chapterId: string | undefined, lessonId: string) {
    try {
      let deleted = await this.lessonRepo.deleteLesson(lessonId);
      if (deleted) {
        let deletedChapter = await this.chapterRepo.deleteLesson(chapterId, lessonId);
        if (deletedChapter) {
          return {status:true, message:"chapter deleted successfully"};
        }
      }
    } catch (error) {
      throw error;
    }
  }
}
export default LessonUseCase;
