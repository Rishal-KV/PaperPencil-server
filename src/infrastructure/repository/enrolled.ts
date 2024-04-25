import IEnrolled from "../../useCase/interface/IEnrolled";
import enrolledCourseModel from "../database/enrolledCourse";
class EnrolledCourseRepo implements IEnrolled {
  async purchaseCourse(
    studentId: string,
    courseId: string
  ): Promise<boolean | { message: string }> {
    try {
      const enrolled = await enrolledCourseModel.findOne({
        studentId,
        courseId,
      });
      if (enrolled) {
        return { message: "already enrolled" };
      } else {
        const enroll = await enrolledCourseModel.create({
          studentId: studentId,
          courseId: courseId,
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
        courseId: courseId,
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
}

export default EnrolledCourseRepo;
