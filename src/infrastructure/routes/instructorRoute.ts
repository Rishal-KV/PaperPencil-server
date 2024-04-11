import express from "express";
import InstructorUseCase from "../../useCase/instructorUseCase";
import InstructorController from "../../adaptors/controllers/instrcutorController";
import InstructorRepo from "../repository/instructorRepo";
import Jwt from "../utils/Jwt";
import GenerateOTP from "../utils/generateOtp";
import NodeMailer from "../utils/email";
import Bcrypt from "../utils/bcrypt";
import OtpRepo from "../repository/otpRepository";
import CourseRepo from "../repository/courseRepo";
import CourseUseCase from "../../useCase/courseUseCase";
import CourseController from "../../adaptors/controllers/courseController";
import upload from "../middleware/multer";
import instructorAuth from "../middleware/instructorAuth";
import ChapterRepo from "../repository/chapterRepo";
import ChapterUseCase from "../../useCase/chapter";
import ChapterController from "../../adaptors/controllers/chapter";
let OtpRep = new OtpRepo();
let otp = new GenerateOTP();
let jwt = new Jwt();
let mail = new NodeMailer();
let instructorRepo = new InstructorRepo();
let bcrypt = new Bcrypt();
let instructorUseCase = new InstructorUseCase(
  instructorRepo,
  jwt,
  otp,
  mail,
  bcrypt,
  OtpRep
);

let courseRepo = new CourseRepo();
let courseUseCase = new CourseUseCase(courseRepo, jwt);
let courseController = new CourseController(courseUseCase);
let instrcutorController = new InstructorController(
  instructorUseCase,
  courseUseCase
);
let chapterRepo = new   ChapterRepo();
let chapterUseCase = new ChapterUseCase(chapterRepo);
let chapterController = new ChapterController(chapterUseCase)
const router = express.Router();

router.post("/sign_up", (req, res) =>
  instrcutorController.SignUpAndSendOtp(req, res)
);
router.post("/login", (req, res) => instrcutorController.Login(req, res));

router.post("/confirm_otp", (req, res) =>
  instrcutorController.authenticateInstructor(req, res)
);
router.post("/add_course", upload.single("image"), (req, res) =>
  courseController.addCourse(req, res)
);
router.get("/course_list", (req, res) =>
  courseController.fetchINstructorCourse(req, res)
);
router.get("/dashboard", instructorAuth, (req, res) =>
  instrcutorController.dashboard(req, res)
);
router.post("/googleAuth", (req, res) =>
  instrcutorController.googleLogin(req, res)
);
router.route('/chapter').post((req,res) => chapterController.addChapter(req,res))
.get((req,res)=>chapterController.getChapter(req,res))

export default router;
