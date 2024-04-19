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
import ChapterUseCase from "../../useCase/chapter";
import ChapterRepo from "../repository/chapterRepo";
import ChapterController from "../../adaptors/controllers/chapter";
import upload from "../middleware/multer";

let otp = new GenerateOTP();
let repository = new StudentRepo();
let courseRepo = new CourseRepo();
let jwt = new Jwt();
let bcrypt = new Bcrypt();
let sendMail = new NodeMailer();
let OtpRep = new OtpRepo();
let courseuseCase = new CourseUseCase(courseRepo, jwt);
let courseController = new CourseController(courseuseCase);
let chapterRepo = new ChapterRepo();
let chapterUseCase = new ChapterUseCase(chapterRepo);
let chapterController = new ChapterController(chapterUseCase);

let studentUseCase = new StudentUseCase(
  otp,
  repository,
  jwt,
  bcrypt,
  sendMail,
  OtpRep,
  courseRepo
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
router.get("/getspecific_course", (req, res) =>
  courseController.fetchSpecificCourse(req, res)
);
router.get("/get_chapter", (req, res) =>
  chapterController.getChapter(req, res)
);
router.post("/changepassword", (req, res) =>
  controller.forgotPassword(req, res)
);
router.post("/setpassword", (req, res) =>
  controller.setForgotPassword(req, res)
);
router.route("/profile").get((req, res) => controller.getStudentData(req, res)).
patch((req,res)=>controller.updateProfile(req,res));

router.patch('/update_image',upload.single('image'),(req,res)=>controller.updateImage(req,res))
export default router;
