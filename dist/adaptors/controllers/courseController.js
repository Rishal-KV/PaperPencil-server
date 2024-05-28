"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = __importDefault(require("../../infrastructure/utils/cloudinary"));
const stripe_1 = require("../../infrastructure/utils/stripe");
const fs_1 = __importDefault(require("fs"));
class CourseController {
    courseUseCase;
    constructor(courseUseCase) {
        this.courseUseCase = courseUseCase;
    }
    async addCourse(req, res) {
        try {
            let formData = req.body;
            console.log(formData);
            let instructor = req.cookies.instructorToken;
            if (req.file) {
                await cloudinary_1.default.uploader
                    .upload(req.file?.path, { folder: "courses" })
                    .then((res) => {
                    if (res.url) {
                        formData.image = res.url;
                        console.log(res.url);
                        fs_1.default.unlinkSync("./src/public/" + req.file?.originalname);
                    }
                    else {
                        throw Error("unable to get url");
                    }
                })
                    .catch((err) => {
                    console.log(err);
                });
                let response = await this.courseUseCase?.saveCourse(formData, instructor);
                if (response?.status) {
                    res.status(200).json(response);
                }
                else {
                    res.status(401).json(response);
                }
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    async fetchINstructorCourse(req, res) {
        try {
            let token = req.cookies.instructorToken;
            let courseData = await this.courseUseCase?.fetchCourseData(token);
            res.status(200).json(courseData);
        }
        catch (error) {
            console.log(error);
        }
    }
    async fetchCourse(req, res) {
        try {
            const search = req.query.search;
            const category = req.query.category;
            const price = req.query.price;
            console.log(search, "search");
            let course = await this.courseUseCase?.fetchCourse(search, category, price);
            res.status(200).json({ course: course });
        }
        catch (error) {
            console.log(error);
        }
    }
    async publishCourse(req, res) {
        try {
            let { id } = req.body;
            let published = await this.courseUseCase?.publishCourse(id);
            if (published?.status) {
                res.status(200).json(published);
            }
            else {
                res.status(401).json(published);
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    async courseAction(req, res) {
        try {
            let { id } = req.body;
            let actionResponse = await this.courseUseCase?.courseAction(id);
            if (actionResponse?.status) {
                res.status(200).json(actionResponse);
            }
            else {
                res.status(400).json(actionResponse);
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    async courseList(req, res) {
        try {
            let { id } = req.body;
            console.log(id);
            let response = await this.courseUseCase?.listCourse(id);
            console.log(response);
            res.status(200).json(response);
        }
        catch (error) { }
    }
    async fetchSpecificCourse(req, res) {
        try {
            let id = req.query.id;
            console.log(id);
            let courses = await this.courseUseCase?.fetchSpecificCourse(id);
            if (courses?.status) {
                res.status(200).json(courses);
            }
            else {
                res.status(401).json(courses);
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    async payment(req, res) {
        try {
            let sessionId = await (0, stripe_1.paymentCheckOut)(req.body);
            res.status(200).json(sessionId);
        }
        catch (error) {
            console.log(error);
        }
    }
    async updateCourse(req, res) {
        try {
            const courseId = req.body.courseId;
            const course = req.body.courseData;
            const response = await this.courseUseCase?.updateCourse(courseId, course);
            if (response?.status) {
                res.status(200).json(response);
            }
            else {
                res.status(401).json(response);
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    async getInstructor(req, res) {
        try {
            const courseId = req.query.courseId;
            const response = await this.courseUseCase?.getInstructor(courseId);
            res.status(200).json(response);
        }
        catch (error) {
            console.log(error);
        }
    }
}
exports.default = CourseController;
