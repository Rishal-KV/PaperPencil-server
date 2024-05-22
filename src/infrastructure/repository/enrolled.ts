import EnrolledCourse from "../../domain/enrolledCourse";
import InstructorIncome from "../../domain/instructorIncome";
import IEnrolled from "../../useCase/interface/IEnrolled";
import chapterModel from "../database/chapter";
import enrolledCourseModel from "../database/enrolledCourse";
import chatModel from "../database/chat";
import favouriteModel from "../database/favourites";
import { Types } from "mongoose";
interface CompleteMonthlySales {
  year: number;
  month: number;
  totalSales: number;
  enrollmentCount: number;
}
interface MonthlySales {
  _id: {
    year: number;
    month: number;
  };
  totalSales: number;
  enrollmentCount: number;
}
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
          await favouriteModel.findOneAndUpdate(
            { studentId: studentId },
            {
              $pull: { favourites: courseId },
            }
          );
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
        members: [studentId, instructorId],
      });
      return true;
    }
    return true;
  }

  async fetchMonthlySales(instructorId: string): Promise<any> {
    try {
      const monthlySales: MonthlySales[] = await enrolledCourseModel.aggregate([
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
            as: "courseDetails",
          },
        },
        {
          $unwind: "$courseDetails",
        },
        {
          $match: {
            "courseDetails.instructor": instructorId,
          },
        },
        {
          $project: {
            year: { $year: "$enrolled" },
            month: { $month: "$enrolled" },
            coursePrice: "$courseDetails.price",
          },
        },
        {
          $group: {
            _id: { year: "$year", month: "$month" },
            totalSales: { $sum: { $multiply: ["$coursePrice", 0.8] } },
            enrollmentCount: { $sum: 1 },
          },
        },
        {
          $sort: { "_id.year": 1, "_id.month": 1 },
        },
      ]);

      // Create an array of all months within the year range found in the results
      const startDate = new Date(monthlySales[0]._id.year, 0); // Start of the first year
      const endDate = new Date(
        monthlySales[monthlySales.length - 1]._id.year,
        11
      ); // End of the last year

      const completeMonthlySales: CompleteMonthlySales[] = [];
      let currentDate = startDate;

      while (currentDate <= endDate) {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1; // getMonth() is zero-based

        const monthlySale = monthlySales.find(
          (sale) => sale._id.year === year && sale._id.month === month
        );

        completeMonthlySales.push({
          year,
          month,
          totalSales: monthlySale ? monthlySale.totalSales : 0,
          enrollmentCount: monthlySale ? monthlySale.enrollmentCount : 0,
        });

        currentDate.setMonth(currentDate.getMonth() + 1);
      }

      return completeMonthlySales;
    } catch (error) {
      console.error("Error fetching monthly sales:", error);
      throw error;
    }
  }

  async saveCourseProgress(
    courseId: string,
    studentId: string,
    date: Date
  ): Promise<void> {
    try {
      const res = await enrolledCourseModel.findOneAndUpdate(
        { course: courseId, studentId: studentId },
        { $set: { courseStatus: true,completedDate:date } }
      );
      console.log(res, "res");
    } catch (error) {
      console.error("Error updating course progress:", error);
    }
  }
  async isCourseCompleted(
    courseId: string,
    studentId: string
  ): Promise<EnrolledCourse | null> {
    try {
      const completed = await enrolledCourseModel.findOne({
        course: courseId,
        studentId: studentId,
      }).populate('studentId').populate('course');

      if (completed) {
        return completed;
      } else {
        return null;
      }
    } catch (error) {
      throw error;
    }
  }
}

export default EnrolledCourseRepo;
