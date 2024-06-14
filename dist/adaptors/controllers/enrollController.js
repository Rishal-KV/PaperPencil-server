"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pdfKIT_1 = require("../../infrastructure/utils/pdfKIT");
class EnrollController {
    enrollUseCase;
    constructor(enrollUseCase) {
        this.enrollUseCase = enrollUseCase;
    }
    async enroll(req, res) {
        try {
            let { courseId, studentId } = req.body;
            let response = await this.enrollUseCase.enrollCourse(courseId, studentId);
            if (response) {
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
    async checkEnroll(req, res) {
        try {
            let courseId = req.query.courseId;
            let studentId = req.query.studentId;
            let enrolled = await this.enrollUseCase.checkEnroll(studentId, courseId);
            if (enrolled?.enrolled) {
                res.status(200).json(enrolled);
            }
            else {
                res.status(200).json(enrolled);
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    async fetchCourse(req, res) {
        try {
            const studentId = req.query.studentId;
            const response = await this.enrollUseCase.enrolledCourse(studentId);
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
    async enrollments(req, res) {
        try {
            const courseId = req.query.courseId;
            const response = await this.enrollUseCase.enrollments(courseId);
            if (response) {
                res.status(200).json(response);
            }
            else {
                res.status(200).json(response);
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    async calProfit(req, res) {
        try {
            const instructorId = req.query.instructorId;
            const response = await this.enrollUseCase.getProfit(instructorId);
            res.status(200).json(response);
        }
        catch (error) {
            console.log(error);
        }
    }
    async saveProgress(req, res) {
        try {
            const lessonId = req.body.lessonId;
            const courseId = req.body.courseId;
            const studentId = req.body.studentId;
            const response = await this.enrollUseCase.saveProgress(courseId, lessonId, studentId);
            res.status(200).json(response);
        }
        catch (error) {
            console.log(error);
        }
    }
    async checkProgress(req, res) {
        try {
            const studentId = req.query.studentId;
            const courseId = req.query.courseId;
            const response = await this.enrollUseCase.checkProgress(studentId, courseId);
            if (response?.status) {
                res.status(200).json(response);
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    async createChat(req, res) {
        try {
            const { studentId, instructorId } = req.body;
            console.log(req.body);
            const response = await this.enrollUseCase.createChat(studentId, instructorId);
            res.status(200).json(response);
        }
        catch (error) {
            console.log(error);
        }
    }
    async fetchMonthlySales(req, res) {
        try {
            const insturctorId = req.query.instructorId;
            const response = await this.enrollUseCase.fetchMonthlySales(insturctorId);
            res.status(200).json(response);
        }
        catch (error) {
            console.log(error);
        }
    }
    async generateCertificate(req, res) {
        try {
            const courseId = req.params.courseId;
            const studentId = req.params.studentId;
            const isCourseCompleted = (await this.enrollUseCase.isCourseCompleted(courseId, studentId));
            if (isCourseCompleted) {
                (0, pdfKIT_1.generateCertificate)(res, isCourseCompleted.response?.studentId.name, isCourseCompleted.response?.course.name, isCourseCompleted.response?.completedDate);
                res.setHeader("Content-Disposition", "attachment; filename=certificate.pdf");
                res.setHeader("Content-Type", "application/pdf");
            }
            else {
                res.status(401).json({ message: "course not completed" });
            }
        }
        catch (error) {
            console.log(error);
            res.status(500).send("An error occurred");
        }
    }
    async courseProgress(req, res) {
        try {
            const studentId = req.body.studentId;
            const courseId = req.body.courseId;
            const date = req.body.date;
            const response = await this.enrollUseCase.saveCourseProgress(studentId, courseId, date);
            res.status(200).json(response);
        }
        catch (error) {
            console.log(error);
        }
    }
    async generateInvoice(req, res) {
        try {
            const courseId = req.query.courseId;
            const studentId = req.query.studentId;
            const response = await this.enrollUseCase.generateInvoice(courseId, studentId);
            if (response) {
                console.log(response, "ress");
                (0, pdfKIT_1.generateInvoice)(res, response.studentId.name, response.course.name, response.course.price, response.course.description, response.enrolled);
                res.setHeader("Content-Disposition", "attachment; filename=invoice.pdf");
                res.setHeader("Content-Type", "application/pdf");
            }
            else {
                res.status(401).json({ message: "course not completed" });
            }
        }
        catch (error) {
            console.log(error);
        }
    }
}
exports.default = EnrollController;
