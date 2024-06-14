"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = __importDefault(require("../../infrastructure/utils/cloudinary"));
class LessonController {
    lesson;
    constructor(lesson) {
        this.lesson = lesson;
    }
    async addChapter(req, res) {
        try {
            let { id, title } = req.body;
            if (!req.file) {
                return res.status(400).json({ error: "No file uploaded" });
            }
            const moduleVideo = await cloudinary_1.default.uploader.upload(req.file.path, {
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
            }
            else {
                res.status(401).json(chapterResponse);
            }
        }
        catch (error) {
            console.error("Error adding lesson:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
    async deleteLesson(req, res) {
        try {
            // console.log(req.query);
            // let lessonId = req.query.lessonId as string;
            // let courseId = req.query.courseId as string;
            // console.log(courseId);
            let { lessonId, chapterId } = req.query;
            if (!lessonId) {
                throw new Error('lessonId is missing');
            }
            let response = await this.lesson.deleteLesson(chapterId, lessonId);
            if (response?.status) {
                res.status(200).json(response);
            }
        }
        catch (error) {
            console.log(error);
        }
    }
}
exports.default = LessonController;
