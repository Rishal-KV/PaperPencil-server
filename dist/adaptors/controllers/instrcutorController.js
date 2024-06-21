"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = __importDefault(require("../../infrastructure/utils/cloudinary"));
const fs_1 = __importDefault(require("fs"));
class InstructorController {
    instructor;
    course;
    constructor(instructor, course) {
        (this.instructor = instructor), (this.course = course);
    }
    async SignUpAndSendOtp(req, res) {
        try {
            const resposneFromSignUp = await this.instructor.signUpAndSendOtp(req.body);
            if (resposneFromSignUp && resposneFromSignUp.status) {
                res.status(200).json(resposneFromSignUp);
            }
            else {
                res.status(401).json(resposneFromSignUp);
            }
        }
        catch (error) {
            throw error;
        }
    }
    async authenticateInstructor(req, res) {
        try {
            console.log(req.headers);
            const token = req.headers.authorization;
            let response = await this.instructor.authenticate(token, req.body.otp);
            if (response?.status) {
                res.status(200).json(response);
            }
            else {
                res.status(401).json(response);
            }
        }
        catch (error) {
            throw error;
        }
    }
    async Login(req, res) {
        try {
            let instructorData = req.body;
            let verifiedInstructor = await this.instructor.Login(instructorData);
            if (verifiedInstructor.status) {
                res.status(200).json({
                    verifiedInstructor,
                });
            }
            else {
                res.status(401).json(verifiedInstructor);
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    async dashboard(req, res) {
        try {
            let token = req.headers.authorization;
            let courses = await this.course.fetchCourseData(token);
            res.status(200).json(courses);
        }
        catch (error) {
            console.log(error);
        }
    }
    async googleLogin(req, res) {
        try {
            let response = await this.instructor.googleAuth(req.body);
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
    async fetchProfile(req, res) {
        try {
            const email = req.query.email;
            console.log(email, "mama");
            const response = await this.instructor.fetchProfile(email);
            res.status(200).json(response);
        }
        catch (error) {
            console.log(error);
        }
    }
    async updateProfile(req, res) {
        try {
            const instructorId = req.body.instructorId;
            const instructorData = req.body.instructorData;
            console.log(instructorData);
            const response = await this.instructor.updateProfile(instructorId, instructorData);
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
    async updateImage(req, res) {
        try {
            const token = req.headers.authorization;
            let image = "";
            console.log(req.file);
            if (req.file) {
                await cloudinary_1.default.uploader
                    .upload(req.file?.path, { folder: "profile", resource_type: 'auto' })
                    .then(async (imageUploaded) => {
                    if (imageUploaded.url) {
                        image = imageUploaded.url;
                        const response = await this.instructor.updateImage(token, image);
                        fs_1.default.unlinkSync("./src/public/" + req.file?.originalname);
                        if (response?.status) {
                            res.status(200).json(response);
                        }
                        else {
                            res.status(401).json(response);
                        }
                    }
                    else {
                        throw Error("unable to get url");
                    }
                })
                    .catch((err) => {
                    console.log(err);
                });
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    async resendOtp(req, res) {
        try {
            const token = req.body.headers.Authorization;
            const resposne = await this.instructor.resendOtp(token);
            if (resposne?.status) {
                res.status(200).json(resposne);
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    async updatePassword(req, res) {
        try {
            console.log(req.body);
            const { password, newPassword, email } = req.body;
            const updated = await this.instructor.changePassword(password, email, newPassword);
            if (updated) {
                res.status(200).json(updated);
            }
            else {
                res.status(204).json(updated);
            }
        }
        catch (error) {
            console.log(error);
        }
    }
}
exports.default = InstructorController;
