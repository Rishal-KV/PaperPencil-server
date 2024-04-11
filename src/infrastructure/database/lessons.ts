import { Schema,model } from "mongoose";
import { Lesson } from "../../domain/lessons";
const LessonSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  videoUrl: {
    type: String,
    required: true,
  },
  chapter: {
    type: String,
    ref: 'Chapter',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const lessonModel = model<Lesson>('Lesson', LessonSchema);