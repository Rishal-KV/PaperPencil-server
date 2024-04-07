import  express  from "express";
import studentController from "../../adaptors/controllers/studentController";
import StudentUseCase from "../../useCase/studentUseCase";
import GenerateOTP from "../utils/generateOtp";
import StudentRepo from "../repository/studentRepo";
import Jwt from "../utils/Jwt";
import Bcrypt from "../utils/bcrypt";
import NodeMailer from "../utils/email";
import OtpRepo from "../repository/otpRepository";

let otp = new  GenerateOTP()
let repository = new StudentRepo() 
let jwt = new Jwt()
let bcrypt = new Bcrypt()
let sendMail = new NodeMailer()
let OtpRep = new OtpRepo()


let studentUseCase = new StudentUseCase(otp,repository,jwt,bcrypt,sendMail,OtpRep)

let controller = new studentController(studentUseCase)
 const router = express.Router();


 router.post('/login_student',(req,res)=>controller.studentLogin(req,res))
 router.post('/signup_student',(req,res)=>controller.SignUpAndSendOtp(req,res))
 router.post('/verify_otp',(req,res)=>controller.authenticateStudent(req,res))
 router.post('/google_login',(req,res)=>controller.googleLogin(req,res))

 export default router

