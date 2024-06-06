"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = __importDefault(require("../../infrastructure/utils/cloudinary"));
const fs_1 = __importDefault(require("fs"));
class StudentController {
    studentUseCase;
    constructor(studentUseCase) {
        this.studentUseCase = studentUseCase;
    }
    async SignUpAndSendOtp(req, res) {
        try {
            let resposneFromSignUp = await this.studentUseCase.signUpAndSendOtp(req.body);
            if (resposneFromSignUp && resposneFromSignUp.status) {
                res.status(200).json(resposneFromSignUp);
            }
            else {
                res.status(401).json(resposneFromSignUp);
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    async authenticateStudent(req, res) {
        try {
            const token = req.headers.authorization;
            if (!token) {
                res.status(401).json({ error: "Authorization token not provided." });
                return;
            }
            console.log(token);
            const otp = req.body?.otp;
            if (!otp) {
                res.status(400).json({ error: "OTP not provided." });
                return;
            }
            const response = await this.studentUseCase.authenticate(token, otp);
            if (response?.status) {
                res.status(200).json(response);
            }
            else {
                res.status(401).json(response);
            }
        }
        catch (error) {
            console.error("Error occurred:", error);
            res.status(500).json({ error: "Internal server error." });
        }
    }
    async studentLogin(req, res) {
        try {
            const { email, password } = req.body;
            let verifiedStudent = await this.studentUseCase.loginStudent(email, password);
            if (verifiedStudent && verifiedStudent.status) {
                if (verifiedStudent.status) {
                    return res.status(200).json({
                        verifiedStudent,
                    });
                }
                else {
                    res.status(401).json(verifiedStudent);
                }
            }
            else {
                res.status(401).json(verifiedStudent);
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    async googleLogin(req, res) {
        try {
            console.log(req.body, "body....");
            let response = await this.studentUseCase.googleAuth(req.body);
            if (response?.status) {
                res
                    .cookie("studentToken", response.token, {
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
    async forgotPassword(req, res) {
        try {
            let { email } = req.body;
            let response = await this.studentUseCase.forgotPassword(email);
            if (response?.status) {
                res
                    .cookie("studentOtp", response.student, {
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
    async setForgotPassword(req, res) {
        try {
            let email = req.cookies.studentEmail;
            let password = req.body.password;
            let response = await this.studentUseCase.setForgotPassword(email, password);
            // console.log(response);
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
    async getStudentData(req, res) {
        try {
            let studentId = req.params.studentId;
            console.log(studentId, "hehehe");
            let student = await this.studentUseCase.get_studentData(studentId);
            res.status(200).json(student);
        }
        catch (error) {
            console.log(error);
        }
    }
    async updateProfile(req, res) {
        try {
            let studentId = req.params.studentId;
            let response = await this.studentUseCase.updateProfile(studentId, req.body);
            if (response?.status) {
                res.status(200).json(response);
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    async updateImage(req, res) {
        try {
            let token = req.headers.authorization;
            let formData = req.body;
            if (req.file) {
                await cloudinary_1.default.uploader
                    .upload(req.file?.path, { folder: "profile" })
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
            }
            let response = await this.studentUseCase.updateImage(token, formData);
            if (response?.status) {
                res.status(200).json(response);
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    async forgotConfirmOtp(req, res) {
        try {
            const email = req.cookies.studentOtp;
            const otp = req.body.otp;
            const response = await this.studentUseCase.confirmForgotOtp(email, otp);
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
            let token = req.cookies.studentOtp;
            console.log(token, "token");
            const resposne = await this.studentUseCase.resendOtp(token);
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
            const updated = await this.studentUseCase.changePassword(password, email, newPassword);
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
exports.default = StudentController;
