import EnrolledCourseRepo from "../infrastructure/repository/enrolled";
class EnrolledCourseUseCase {
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
  async enrolledCourse(studentId: string) {
    try {
      const response = await this.enrolledCourseRepo.fetchEnrolledCourse(
        studentId
      );
      if (response) {
        return { status: true, courses: response };
      } else {
        return { status: false, message: "failed to fetch" };
      }
    } catch (error) {
      console.log(error);
    }
  }
  async enrollments(courseId: string) {
    try {
      const response = await this.enrolledCourseRepo.fetchEnrollments(courseId);
      if (response) {
        return { status: true, enrollments: response };
      } else {
        return { status: false, enrollments: response };
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getProfit(instructorId: string) {
    try {
      const response = await this.enrolledCourseRepo.profitCalc(instructorId);
      console.log(response);

      const profit = response[0].totalIncome;
      return { totalIncome: profit };
    } catch (error) {
      console.log(error);
    }
  }

  async saveProgress(courseId: string, lessoId: string, studentId: string) {
    try {
      await this.enrolledCourseRepo.saveProgress(courseId, studentId, lessoId);
      return { status: true };
    } catch (error) {
      console.log(error);
    }
  }
  async checkProgress(studentId: string, courseId: string) {
    try {
      const response = await this.enrolledCourseRepo.checkProgress(
        studentId,
        courseId
      );
      if (response) {
        return { status: true, enrolledCourse: response };
      }
    } catch (error) {
      console.log(error);
    }
  }
  async createChat(studentId: string, instructorId: string) {
    try {
      const response = await this.enrolledCourseRepo.createChat(
        studentId,
        instructorId
      );
      return { status: response, message: "connected" };
    } catch (error) {
      console.log(error);
    }
  }
  async fetchMonthlySales(instructorId: string) {
    try {
      const response = await this.enrolledCourseRepo.fetchMonthlySales(
        instructorId
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }
  async saveCourseProgress(studentId: string, courseId: string, date: Date) {
    try {
      await this.enrolledCourseRepo.saveCourseProgress(
        courseId,
        studentId,
        date
      );
      return { status: true };
    } catch (error) {
      console.log(error);
    }
  }

  async isCourseCompleted(courseId: string, studentId: string) {
    try {
      const response = await this.enrolledCourseRepo.isCourseCompleted(
        courseId,
        studentId
      );
      if (response) {
        return {  response };
      } else {
        return {  response };
      }
    } catch (error) {
      console.log(error);
    }
  }
}
export default EnrolledCourseUseCase;
