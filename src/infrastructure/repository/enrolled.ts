import EnrolledCourse from "../../domain/enrolledCourse";
import IEnrolled from "../../useCase/interface/IEnrolled";
import enrolledCourseModel from "../database/enrolledCourse";
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
}

export default EnrolledCourseRepo;
