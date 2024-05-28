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
            if (resposneFromSignUp.status) {
                res
                    .cookie("studentOtp", resposneFromSignUp.Token, {
                    expires: new Date(Date.now() + 25892000000),
                    secure: true,
                    sameSite: true,
                    path: "/",
                })
                    .status(200)
                    .json(resposneFromSignUp);
            }
            else {
                console.log(resposneFromSignUp);
                res.status(401).json(resposneFromSignUp);
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    async authenticateStudent(req, res) {
        try {
            let token = req.cookies.studentOtp;
            console.log(token);
            let response = await this.studentUseCase.authenticate(token, req.body.otp);
            if (response?.status) {
                res
                    .cookie("studentToken", response.token, {
                    expires: new Date(Date.now() + 25892000000),
                    secure: true,
                    sameSite: "none",
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
    async studentLogin(req, res) {
        try {
            const { email, password } = req.body;
            let verifiedStudent = await this.studentUseCase.loginStudent(email, password);
            if (verifiedStudent && verifiedStudent.status) {
                if (verifiedStudent.status) {
                    return res
                        .cookie("studentToken", verifiedStudent.token, {
                        expires: new Date(Date.now() + 25892000000),
                        sameSite: 'none',
                        secure: true,
                        httpOnly: false,
                    })
                        .status(200)
                        .json({
                        verifiedStudent,
                    });
                }
                else {
                    console.log("hehehe no pass");
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
    async verifyByEmail(req, res) {
        try {
            console.log("called");
            let id = req.query.id;
            console.log(id);
            await this.studentUseCase.verifyByEMail(id);
        }
        catch (error) {
            console.log(error);
        }
    }
    async forgotPassword(req, res) {
        try {
            let { email } = req.body;
            let response = await this.studentUseCase.forgotPassword(email);
            console.log(response);
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
            console.log(req.body);
            let token = req.cookies.studentToken;
            let response = await this.studentUseCase.updateProfile(token, req.body);
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
            let token = req.cookies.studentToken;
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
}
exports.default = StudentController;
