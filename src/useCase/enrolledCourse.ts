import EnrolledCourseRepo from "../infrastructure/repository/enrolled";
class enrolledCourseUseCase {
  private enrolledCourseRepo: EnrolledCourseRepo;
  constructor(enrolledCourseRepo: EnrolledCourseRepo) {
    this.enrolledCourseRepo = enrolledCourseRepo;
  }
  async enrollCourse(courseId: string, StudentId: string) {
    try {
      let response = await this.enrolledCourseRepo.purchaseCourse(
        StudentId,
        courseId
      );
      if (response === true) {
        return { status: true };
      } else if (response && response.message) {
        return { status: false, message: response.message };
      } else {
        return { status: false, message: "failed to enroll" };
      }
    } catch (error) {}
  }

  async checkEnroll(studentId: string, courseId: string) {
    try {
      const enrolled = await this.enrolledCourseRepo.checkEnroll(
        studentId,
        courseId
      );
      return enrolled ? { enrolled: true } : { enrolled: false };
    } catch (error) {
      console.log(error);
    }
  }
}
export default enrolledCourseUseCase;
