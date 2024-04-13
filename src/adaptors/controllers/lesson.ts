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
    
      
      let { id, title} = req.body;
      console.log(title);
      
      console.log(req.file);
      
      
      
  
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }
  
      const moduleVideo = await cloudinary.uploader.upload(req.file.path, {
        resource_type: "video",
        public_id: "coursevideo",
        eager: [
          { width: 300, height: 300, crop: "pad", audio_codec: "none" },
          { width: 160, height: 100, crop: "crop", gravity: "south", audio_codec: "none" }
        ]
      });
      const video = moduleVideo.secure_url
      console.log(video);
      
     
      

      let chapterResponse = await this.lesson.addLesson(id, video,title);
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
  
}

export default LessonController;
