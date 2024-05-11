import EnrolledCourse from "../../domain/enrolledCourse";
import InstructorIncome from "../../domain/instructorIncome";
import IEnrolled from "../../useCase/interface/IEnrolled";
import chapterModel from "../database/chapter";
import enrolledCourseModel from "../database/enrolledCourse";
import chatModel from "../database/chat";
import { Types } from "mongoose";
class EnrolledCourseRepo implements IEnrolled {
  async purchaseCourse(
    studentId: string,
    courseId: string
  ): Promise<boolean | { message: string }> {
    try {
      const enrolled = await enrolledCourseModel.findOne({
        studentId: studentId,
        course: courseId,
      });

      if (enrolled) {
        return { message: "already enrolled" };
      } else {
        const enroll = await enrolledCourseModel.create({
          studentId: studentId,
          course: courseId,
        });
        if (enroll) {
          return true;
        } else {
          return false;
        }
      }
    } catch (error) {
      throw error;
    }
  }
  async checkEnroll(studentId: string, courseId: string): Promise<boolean> {
    try {
      const enrolled = await enrolledCourseModel.findOne({
        studentId: studentId,
        course: courseId,
      });
      if (enrolled) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw error;
    }
  }
  async fetchEnrolledCourse(
    studentId: string
  ): Promise<EnrolledCourse[] | null> {
    const enrolledCourse = await enrolledCourseModel
      .find({ studentId: studentId })
      .populate({
        path: "course",
        populate: { path: "instructor", model: "instructor" },
      });
    if (enrolledCourse) {
      return enrolledCourse;
    } else {
      return null;
    }
  }
  async fetchEnrollments(courseId: string): Promise<EnrolledCourse[] | null> {
    const enrollments = await enrolledCourseModel
      .find({ course: courseId })
      .populate("studentId");
    if (enrollments) {
      return enrollments;
    } else {
      return null;
    }
  }
  async profitCalc(instructorId: string): Promise<InstructorIncome[]> {
    try {
      console.log(instructorId);

      const profit = await enrolledCourseModel.aggregate([
        {
          $addFields: {
            course: { $toObjectId: "$course" },
          },
        },
        {
          $lookup: {
            from: "courses",
            localField: "course",
            foreignField: "_id",
            as: "courseInfo",
          },
        },
        { $unwind: "$courseInfo" },
        {
          $match: {
            "courseInfo.instructor": instructorId,
          },
        },
        {
          $group: {
            _id: null,
            totalIncome: {
              $sum: { $multiply: ["$courseInfo.price", 0.8] },
            },
          },
        },
      ]);

      return profit;
    } catch (error) {
      throw error;
    }
  }

  async saveProgress(
    courseId: string,
    studentId: string,
    lessonId: string // Corrected typo in parameter name
  ): Promise<void> {
    await enrolledCourseModel.findOneAndUpdate(
      { course: courseId, studentId: studentId },
      {
        $push: {
          completedLessons: lessonId, // Corrected typo in parameter name
        },
      }
    );
    const chapters = await chapterModel.find({ course: courseId });
    const enrolledCourse = await enrolledCourseModel.findOne({
      course: courseId,
      studentId,
    });

    const completedChapter: Types.ObjectId[] = []; // Define completedChapter as Types.ObjectId[]

    for (const chapter of chapters) {
      if (chapter.lessons) {
        // Check if chapter.lessons is defined
        const LessonIds: Types.ObjectId[] = chapter.lessons.map(
          (id: string) => new Types.ObjectId(id)
        ); // Convert string array to Types.ObjectId array
        const allLessonsCompleted = LessonIds.every((lessonId) =>
          enrolledCourse?.completedLessons
            ?.map(String)
            .includes(String(lessonId))
        );
        if (allLessonsCompleted) {
          completedChapter.push(new Types.ObjectId(chapter._id)); // Convert chapter._id to Types.ObjectId
        }
      }
    }
    if (enrolledCourse) {
      // Ensure enrolledCourse.completedChapters is typed as Types.ObjectId[]
      enrolledCourse.completedChapters = completedChapter as any;
      await enrolledCourse.save();
    }
  }

  async checkProgress(
    studentId: string,
    courseId: string
  ): Promise<EnrolledCourse | null> {
    try {
      const enrolledCourse = await enrolledCourseModel.findOne({
        studentId: studentId,
        course: courseId,
      });
      if (enrolledCourse) {
        return enrolledCourse;
      } else {
        return null;
      }
    } catch (error) {
      throw error;
    }
  }
  async createChat(studentId: string, instructorId: string): Promise<boolean> {
  
    
    const chatExist = await chatModel.findOne({
      members: { $all: [studentId, instructorId] },
    });
   

    if (!chatExist) {
      const newChat = chatModel.create({
        members: [ studentId, instructorId ],
      });
      return true;
    }
    return true;
  }

  
}

export default EnrolledCourseRepo;
