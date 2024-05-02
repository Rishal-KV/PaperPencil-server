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
import EnrolledCourseRepo from "../repository/enrolled";
import EnrolledCourseUseCase from "../../useCase/enrolledCourse";
import EnrollController from "../../adaptors/controllers/enrollController";
import ReviewRepo from "../repository/reviewRepo";
import ReviewUseCase from "../../useCase/reviewUseCase";
import ReviewController from "../../adaptors/controllers/reviewController";
import studentAuth from "../middleware/studentAuth";
const otp = new GenerateOTP();
const repository = new StudentRepo();
const courseRepo = new CourseRepo();
const jwt = new Jwt();
const bcrypt = new Bcrypt();
const sendMail = new NodeMailer();
const OtpRep = new OtpRepo();
const courseuseCase = new CourseUseCase(courseRepo, jwt);
const courseController = new CourseController(courseuseCase);
const chapterRepo = new ChapterRepo();
const chapterUseCase = new ChapterUseCase(chapterRepo);
const chapterController = new ChapterController(chapterUseCase);
const enrollRepo = new EnrolledCourseRepo();
const enrollUseCase = new EnrolledCourseUseCase(enrollRepo);
const enrollController = new EnrollController(enrollUseCase);
const reviewRepo = new ReviewRepo();
const reviewUseCase = new ReviewUseCase(reviewRepo);
const reviewController = new ReviewController(reviewUseCase);

const studentUseCase = new StudentUseCase(
  otp,
  repository,
  jwt,
  bcrypt,
  sendMail,
  OtpRep,
  courseRepo
);

const controller = new studentController(studentUseCase);
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
router
  .route("/profile")
  .get(studentAuth,(req, res) => controller.getStudentData(req, res))
  .patch(studentAuth,(req, res) => controller.updateProfile(req, res));

router.patch("/update_image", studentAuth, upload.single("image"), (req, res) =>
  controller.updateImage(req, res)
);

router.post("/stripe_payment", (req, res) =>
  courseController.payment(req, res)
);

router
  .route("/enroll")
  .post((req, res) => enrollController.enroll(req, res))
  .get((req, res) => enrollController.checkEnroll(req, res));

router
  .route("/review")
  .post((req, res) => reviewController.addReview(req, res))
  .get((req, res) => reviewController.fetchReviews(req, res));

router.get("/check_review", (req, res) =>
  reviewController.checkReview(req, res)
);
router.post('/forgot_confirm_otp',(req,res) => controller.forgotConfirmOtp(req,res))
router.get('/enrolled_course',studentAuth,(req,res)=>enrollController.fetchCourse(req,res))
export default router;
