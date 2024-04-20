import LessonUseCase from "../../useCase/lessonUseCase";
import ChapterUseCase from "../../useCase/chapter";
import cloudinary from "../../infrastructure/utils/cloudinary";
import { Request, Response } from "express";
class LessonController {
  private lesson: LessonUseCase;

  constructor(lesson: LessonUseCase) {
    this.lesson = lesson;
  }
  async addChapter(req: Request, res: Response) {
    try {
      let { id, title } = req.body;

      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const moduleVideo = await cloudinary.uploader.upload(req.file.path, {
        resource_type: "video",
        public_id: "coursevideo",
        eager: [
          { width: 300, height: 300, crop: "pad", audio_codec: "none" },
          {
            width: 160,
            height: 100,
            crop: "crop",
            gravity: "south",
            audio_codec: "none",
          },
        ],
      });
      const video = moduleVideo.secure_url;
      console.log(video);

      let chapterResponse = await this.lesson.addLesson(id, video, title);
      if (chapterResponse.status) {
        res.status(200).json(chapterResponse);
      } else {
        res.status(401).json(chapterResponse);
      }
    } catch (error) {
      console.error("Error adding lesson:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
  async deleteLesson(req: Request, res: Response) {
    try {
      // console.log(req.query);
      
      // let lessonId = req.query.lessonId as string;
      // let courseId = req.query.courseId as string;
      // console.log(courseId);
    
      let { lessonId, chapterId }: { lessonId?: string | undefined; chapterId?: string } = req.query;
   
      

      if (!lessonId) {
        
          throw new Error('lessonId is missing');
      }
 
      

      let response = await this.lesson.deleteLesson(chapterId, lessonId);
      if (response?.status) {
        res.status(200).json(response);
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export default LessonController;
