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
            console.log("ehehhe");
            let resposneFromSignUp = await this.instructor.signUpAndSendOtp(req.body);
            if (resposneFromSignUp.status) {
                res
                    .cookie("instructorOtpToken", resposneFromSignUp.Token, {
                    expires: new Date(Date.now() + 25892000000),
                    secure: true,
                })
                    .status(200)
                    .json(resposneFromSignUp);
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
            console.log(req.cookies.instructorOtpToken);
            console.log(req.body);
            let token = req.cookies.instructorOtpToken;
            let response = await this.instructor.authenticate(token, req.body.otp);
            if (response?.status) {
                res
                    .cookie("instructorToken", response.token, {
                    expires: new Date(Date.now() + 25892000000),
                    secure: true,
                })
                    .status(200)
                    .json(response);
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
                return res
                    .cookie("studentToken", verifiedInstructor.token, {
                    expires: new Date(Date.now() + 25892000000),
                    secure: true,
                })
                    .status(200)
                    .json({
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
            let token = req.cookies.instructorToken;
            console.log(token);
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
                res
                    .cookie("instructorToken", response.token, {
                    expires: new Date(Date.now() + 25892000000),
                    secure: true,
                })
                    .status(200)
                    .json(response);
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
            const response = await this.instructor.fetchProfile(email);
            console.log(response);
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
            const token = req.cookies.instructorToken;
            let image = "";
            if (req.file) {
                await cloudinary_1.default.uploader
                    .upload(req.file?.path, { folder: "profile" })
                    .then((res) => {
                    if (res.url) {
                        image = res.url;
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
            }
            const response = await this.instructor.updateImage(token, image);
            console.log(response);
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
    async resendOtp(req, res) {
        try {
            let token = req.cookies.instructorOtpToken;
            const resposne = await this.instructor.resendOtp(token);
            if (resposne?.status) {
                res.status(200).json(resposne);
            }
        }
        catch (error) {
            console.log(error);
        }
    }
}
exports.default = InstructorController;
