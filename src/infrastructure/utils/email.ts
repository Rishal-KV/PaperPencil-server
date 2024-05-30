import nodemailer from 'nodemailer'
import Imailer from '../../useCase/interface/IMailer';
import dotenv from 'dotenv';
import path from 'path'
dotenv.config({path : path.resolve(__dirname, '../../.env')})
class NodeMailer implements Imailer {
    private transporter: nodemailer.Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            service : 'gmail',
            auth: {
                user:process.env.GMAIL,
                pass:process.env.PASSWORD
            },
           
        });
    }
 
    async sendMail(to: string, otp: number): Promise<any> {
        let mailOptions = {
            from: "rishkv923@gmail.com",
            to: to,
            subject: 'PaperPencil - OTP for Email verification',
            text: `Yout Otp number is ${otp}.`
        };
       
        this.transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Error occurred:', error);
            } else {
                console.log('Email sent:', info.response);
            }
        });

    }
    async sendVerificationMail(id: string,to:string): Promise<any> {
        let mailOptions = {
            from: process.env.EMAIL,
            to: to,
            subject: 'PaperPencil - Email verification',
            html: `<p>Click the following link to verify: <a href="http://localhost:3000/verify_user?id=${id}">Click here to verify</a></p>`
        }
       
        this.transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Error occurred:', error);
            } else {
                console.log('Email sent:', info.response);
            }
        });
    }
}

export default NodeMailer