"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../../.env') });
class NodeMailer {
    transporter;
    constructor() {
        this.transporter = nodemailer_1.default.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL,
                pass: process.env.PASSWORD
            },
        });
    }
    async sendMail(to, otp) {
        let mailOptions = {
            from: "rishkv923@gmail.com",
            to: to,
            subject: 'PaperPencil - OTP for Email verification',
            text: `Yout Otp number is ${otp}.`
        };
        this.transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Error occurred:', error);
            }
            else {
                console.log('Email sent:', info.response);
            }
        });
    }
    async sendVerificationMail(id, to) {
        let mailOptions = {
            from: process.env.EMAIL,
            to: to,
            subject: 'PaperPencil - Email verification',
            html: `<p>Click the following link to verify: <a href="http://localhost:3000/verify_user?id=${id}">Click here to verify</a></p>`
        };
        this.transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Error occurred:', error);
            }
            else {
                console.log('Email sent:', info.response);
            }
        });
    }
}
exports.default = NodeMailer;
