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
import LessonController from "../../adaptors/controllers/lesson";
import LessonUseCase from "../../useCase/lessonUseCase";
import LessonRepo from "../repository/lessonRepo";

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
let chapterRepo = new ChapterRepo();
let courseRepo = new CourseRepo();
let courseUseCase = new CourseUseCase(courseRepo, jwt, chapterRepo);
let courseController = new CourseController(courseUseCase);
let instrcutorController = new InstructorController(
  instructorUseCase,
  courseUseCase
);

let chapterUseCase = new ChapterUseCase(chapterRepo);
let chapterController = new ChapterController(chapterUseCase);
let lessonRepo = new LessonRepo();
let lessonUseCase = new LessonUseCase(lessonRepo, chapterRepo);
let lessonController = new LessonController(lessonUseCase);
const router = express.Router();

router.post("/sign_up", (req, res) =>
  instrcutorController.SignUpAndSendOtp(req, res)
);
router.post("/login", (req, res) => instrcutorController.Login(req, res));

router.post("/confirm_otp", (req, res) =>
  instrcutorController.authenticateInstructor(req, res)
);
router.post("/add_course", instructorAuth, upload.single("image"), (req, res) =>
  courseController.addCourse(req, res)
);
router
  .route("/course_list")
  .get(instructorAuth, (req, res) =>
    courseController.fetchINstructorCourse(req, res)
  )
  .patch(instructorAuth, (req, res) => courseController.courseList(req, res));
router.get("/dashboard", instructorAuth, (req, res) =>
  instrcutorController.dashboard(req, res)
);
router.post("/googleAuth", (req, res) =>
  instrcutorController.googleLogin(req, res)
);
router
  .route("/chapter")
  .post(instructorAuth, (req, res) => chapterController.addChapter(req, res))
  .get(instructorAuth, (req, res) => chapterController.getChapter(req, res));
router.patch("/publish", instructorAuth, (req, res) =>
  courseController.publishCourse(req, res)
);

router
  .route("/lesson")
  .post(instructorAuth, upload.single("video"), (req, res) =>
    lessonController.addChapter(req, res)
  );

export default router;
