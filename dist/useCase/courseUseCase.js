"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CourseUseCase {
    courseRepo;
    chapterRepo;
    Jwt;
    constructor(courseRepo, jwt, chapterRepo) {
        this.courseRepo = courseRepo;
        this.Jwt = jwt;
        this.chapterRepo = chapterRepo;
    }
    async saveCourse(course, Instructor) {
        try {
            let instructor = this.Jwt.verifyToken(Instructor);
            if (instructor) {
                let courseSaved = await this.courseRepo.saveCourseToDataBase(course, instructor.id);
                if (courseSaved) {
                    return { status: true, message: "course added successfuly" };
                }
                else {
                    return { status: false, message: "failed to add course" };
                }
            }
        }
        catch (error) {
            throw error;
        }
    }
    async fetchCourseData(token, pageNo) {
        try {
            let decodeToken = this.Jwt.verifyToken(token);
            const page = parseInt(pageNo);
            console.log(page, "page");
            const limit = 10;
            const skip = (page - 1) * limit;
            if (decodeToken) {
                let courseData = await this.courseRepo.fetchCourseById(decodeToken.id, limit, skip, page);
                return courseData;
            }
        }
        catch (error) {
            throw error;
        }
    }
    async fetchCourse(search, category, price, pageNo, itemLimit) {
        try {
            //pagination
            console.log("called");
            let page = parseInt(pageNo) || 1;
            let limit = parseInt(itemLimit) || 3;
            if (page < 1)
                page = 1;
            if (limit < 1)
                limit = 3;
            const skip = (page - 1) * limit;
            console.log(page, "pagge");
            let course = await this.courseRepo.fetchCourse(search, category, price, limit, skip, page);
            return course;
        }
        catch (error) {
            console.log(error);
        }
    }
    async publishCourse(id) {
        try {
            let chapter = await this.chapterRepo?.findChapterOfCourse(id);
            if (chapter) {
                if (chapter.length > 0 &&
                    chapter[0].lessons &&
                    chapter[0].lessons?.length > 0) {
                    let published = await this.courseRepo.updateById(id);
                    return { status: true, message: "published succesfully" };
                }
                else {
                    return {
                        status: false,
                        message: "minimum one chapter and one lesson required",
                    };
                }
            }
            else {
                throw new Error("could not find chapter");
            }
        }
        catch (error) {
            throw error;
        }
    }
    async courseAction(id) {
        try {
            let courseaction = await this.courseRepo.courseAction(id);
            if (courseaction) {
                return { status: courseaction, message: "course approved" };
            }
            else {
                return { status: courseaction, message: "course failed to update" };
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    async listCourse(id) {
        try {
            let response = await this.courseRepo.courseList(id);
            if (response) {
                return { status: true, message: "course has been listed " };
            }
            else {
                return { status: false, message: "course has been unlisted" };
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    async fetchSpecificCourse(id) {
        try {
            let specificCourse = (await this.courseRepo.fetchSpecificCourse(id));
            function shuffleArray(array) {
                for (let i = array.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [array[i], array[j]] = [array[j], array[i]];
                }
                return array;
            }
            if (specificCourse) {
                const shuffledQuestions = shuffleArray(specificCourse.questions);
                console.log(shuffledQuestions, "shuff");
                return {
                    status: true,
                    courses: specificCourse,
                    questions: shuffledQuestions,
                };
            }
            else {
                return { status: false, message: "no course found" };
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    async updateCourse(courseId, course) {
        try {
            const response = await this.courseRepo.updateCourse(courseId, course);
            if (response) {
                return { status: true, message: "course updated successfully" };
            }
            else {
                return { status: false, message: "failed to update" };
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    async getInstructor(courseId) {
        try {
            const response = await this.courseRepo.fetchSpecificCourse(courseId);
            return { status: true, instructorId: response?.instructor._id };
        }
        catch (error) {
            console.log(error);
        }
    }
}
exports.default = CourseUseCase;
