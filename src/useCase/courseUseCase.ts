import Icourse from "./interface/ICourse";
import Course from "../domain/course";
import Jwt from "../infrastructure/utils/Jwt";
import IChapter from "./interface/IChapter";
class CourseUseCase {
  private courseRepo: Icourse;
  private chapterRepo?: IChapter;
  private Jwt: Jwt;
  constructor(courseRepo: Icourse, jwt: Jwt, chapterRepo?: IChapter) {
    this.courseRepo = courseRepo;
    this.Jwt = jwt;
    this.chapterRepo = chapterRepo;
  }

  async saveCourse(course: Course, Instructor: string) {
    try {
      let instructor = this.Jwt.verifyToken(Instructor);

      if (instructor) {
        let courseSaved = await this.courseRepo.saveCourseToDataBase(
          course,
          instructor.id
        );
        if (courseSaved) {
          return { status: true, message: "course added successfuly" };
        } else {
          return { status: false, message: "failed to add course" };
        }
      }
    } catch (error) {
      throw error;
    }
  }
  async fetchCourseData(token: string) {
    try {
      let decodeToken = this.Jwt.verifyToken(token);

      if (decodeToken) {
        let courseData = await this.courseRepo.fetchCourseById(decodeToken.id);

        return courseData;
      }
    } catch (error) {
      throw error;
    }
  }

  async fetchCourse() {
    try {
      let course = this.courseRepo.fetchCourse();
      return course;
    } catch (error) {
      console.log(error);
    }
  }

  async publishCourse(id: string) {
    try {
      let chapter = await this.chapterRepo?.findChapterOfCourse(id);
      if (chapter) {
        if (
          chapter.length > 0 &&
          chapter[0].lessons &&
          chapter[0].lessons?.length > 0
        ) {
          let published = await this.courseRepo.updateById(id);

          return { status: true, message: "published succesfully" };
        } else {
          return {
            status: false,
            message: "minimum one chapter and one lesson required",
          };
        }
      } else {
        throw new Error("could not find chapter");
      }
    } catch (error) {
      throw error;
    }
  }
}

export default CourseUseCase;
