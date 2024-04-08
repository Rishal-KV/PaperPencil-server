import express from "express";
import studentController from "../../adaptors/controllers/studentController";
import StudentUseCase from "../../useCase/studentUseCase";
import GenerateOTP from "../utils/generateOtp";
import StudentRepo from "../repository/studentRepo";
import Jwt from "../utils/Jwt";
import Bcrypt from "../utils/bcrypt";
import NodeMailer from "../utils/email";
import OtpRepo from "../repository/otpRepository";
import CourseController from "../../adaptors/controllers/courseController";
import CourseUseCase from "../../useCase/courseUseCase";
import CourseRepo from "../repository/courseRepo";
import route from "./adminRoute";
let otp = new GenerateOTP();
let repository = new StudentRepo();
let courseRepo = new CourseRepo();
let jwt = new Jwt();
let bcrypt = new Bcrypt();
let sendMail = new NodeMailer();
let OtpRep = new OtpRepo();
let courseuseCase = new CourseUseCase(courseRepo, jwt);
let courseController = new CourseController(courseuseCase);

let studentUseCase = new StudentUseCase(
  otp,
  repository,
  jwt,
  bcrypt,
  sendMail,
  OtpRep
);

let controller = new studentController(studentUseCase);
const router = express.Router();

router.post("/login_student", (req, res) => controller.studentLogin(req, res));
router.post("/signup_student", (req, res) =>
  controller.SignUpAndSendOtp(req, res)
);
router.get("/verify_user", (req, res) => controller.verifyByEmail(req, res));
router.post("/verify_otp", (req, res) =>
  controller.authenticateStudent(req, res)
);
router.post("/google_login", (req, res) => controller.googleLogin(req, res));
router.get("/get_course", (req, res) => courseController.fetchCourse(req, res));

export default router;
