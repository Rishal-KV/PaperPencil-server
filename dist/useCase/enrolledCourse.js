"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EnrolledCourseUseCase {
    enrolledCourseRepo;
    constructor(enrolledCourseRepo) {
        this.enrolledCourseRepo = enrolledCourseRepo;
    }
    async checkPayment(studentId, courseId) {
        try {
            const response = await this.enrolledCourseRepo.checkPayment(studentId, courseId);
            if (response) {
                return response;
            }
            else {
                return response;
            }
        }
        catch (error) {
        }
    }
    async enrollCourse(courseId, StudentId) {
        try {
            let response = await this.enrolledCourseRepo.purchaseCourse(StudentId, courseId);
            if (response === true) {
                return { status: true };
            }
            else if (response && response.message) {
                return { status: false, message: response.message };
            }
            else {
                return { status: false, message: "failed to enroll" };
            }
        }
        catch (error) { }
    }
    async checkEnroll(studentId, courseId) {
        try {
            const enrolled = await this.enrolledCourseRepo.checkEnroll(studentId, courseId);
            return enrolled ? { enrolled: true } : { enrolled: false };
        }
        catch (error) {
            console.log(error);
        }
    }
    async enrolledCourse(studentId) {
        try {
            const response = await this.enrolledCourseRepo.fetchEnrolledCourse(studentId);
            if (response) {
                return { status: true, courses: response };
            }
            else {
                return { status: false, message: "failed to fetch" };
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    async enrollments(courseId) {
        try {
            const response = await this.enrolledCourseRepo.fetchEnrollments(courseId);
            if (response) {
                return { status: true, enrollments: response };
            }
            else {
                return { status: false, enrollments: response };
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    async getProfit(instructorId) {
        try {
            const response = await this.enrolledCourseRepo.profitCalc(instructorId);
            console.log(response);
            const profit = response[0].totalIncome;
            return { totalIncome: profit };
        }
        catch (error) {
            console.log(error);
        }
    }
    async saveProgress(courseId, lessoId, studentId) {
        try {
            await this.enrolledCourseRepo.saveProgress(courseId, studentId, lessoId);
            return { status: true };
        }
        catch (error) {
            console.log(error);
        }
    }
    async checkProgress(studentId, courseId) {
        try {
            const response = await this.enrolledCourseRepo.checkProgress(studentId, courseId);
            if (response) {
                return { status: true, enrolledCourse: response };
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    async createChat(studentId, instructorId) {
        try {
            const response = await this.enrolledCourseRepo.createChat(studentId, instructorId);
            return { status: response, message: "connected" };
        }
        catch (error) {
            console.log(error);
        }
    }
    async fetchMonthlySales(instructorId) {
        try {
            const response = await this.enrolledCourseRepo.fetchMonthlySales(instructorId);
            return response;
        }
        catch (error) {
            console.log(error);
        }
    }
    async saveCourseProgress(studentId, courseId, date) {
        try {
            await this.enrolledCourseRepo.saveCourseProgress(courseId, studentId, date);
            return { status: true };
        }
        catch (error) {
            console.log(error);
        }
    }
    async isCourseCompleted(courseId, studentId) {
        try {
            const response = await this.enrolledCourseRepo.isCourseCompleted(courseId, studentId);
            if (response) {
                return { response };
            }
            else {
                return { response };
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    async generateInvoice(courseId, studentId) {
        try {
            const purachased = await this.enrolledCourseRepo.courseData(courseId, studentId);
            if (purachased) {
                return purachased;
            }
            else {
                null;
            }
        }
        catch (error) {
            console.log(error);
        }
    }
}
exports.default = EnrolledCourseUseCase;
