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

  async fetchCourse(search:string) {
    try {
      console.log(search);
      
      let course = this.courseRepo.fetchCourse(search);
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
  async courseAction(id: string) {
    try {
      console.log(id);

      let courseaction = await this.courseRepo.courseAction(id);
      // console.log(courseaction);

      if (courseaction) {
        return { status: courseaction, message: "course approved" };
      } else {
        return { status: courseaction, message: "course failed to update" };
      }
    } catch (error) {
      console.log(error);
    }
  }
  async listCourse(id: string) {
    try {
      let response = await this.courseRepo.courseList(id);
      if (response) {
        return { status: true, message: "course has been listed " };
      } else {
        return { status: false, message: "course has been unlisted" };
      }
    } catch (error) {
      console.log(error);
    }
  }
  async fetchSpecificCourse(id: string) {
    try {
      let specificCourse = await this.courseRepo.fetchSpecificCourse(id);
      if (specificCourse) {
        return { status: true, courses: specificCourse };
      } else {
        return { status: true, message: "no course found" };
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export default CourseUseCase;
