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
import instructorAuth from "../middleware/instructorAuth";
import ChapterRepo from "../repository/chapterRepo";
import ChapterUseCase from "../../useCase/chapter";
import ChapterController from "../../adaptors/controllers/chapter";
import LessonController from "../../adaptors/controllers/lesson";
import LessonUseCase from "../../useCase/lessonUseCase";
import LessonRepo from "../repository/lessonRepo";
import upload from "../middleware/multer";
import EnrolledCourseRepo from "../repository/enrolled";
import EnrolledCourseUseCase from "../../useCase/enrolledCourse";
import EnrollController from "../../adaptors/controllers/enrollController";
import ChatRepo from "../repository/chatRepo";
import ChatUseCase from "../../useCase/chatUseCase";
import ChatController from "../../adaptors/controllers/chatController";
import CategoryRepo from "../repository/categoryRepo";
import CategoryUseCase from "../../useCase/categoryUseCase";
import CategoryController from "../../adaptors/controllers/category";
import QuestionRepo from "../repository/question";
import QuestionUseCase from "../../useCase/questionUseCase";
import QuestionController from "../../adaptors/controllers/questionController";
const chatRepo = new ChatRepo();
const chatUseCase = new ChatUseCase(chatRepo);
const chatController = new ChatController(chatUseCase);
const OtpRep = new OtpRepo();
const otp = new GenerateOTP();
const jwt = new Jwt();
const mail = new NodeMailer();
const instructorRepo = new InstructorRepo();
const bcrypt = new Bcrypt();
const categoryRepo = new CategoryRepo();
const categoryUseCase = new CategoryUseCase(categoryRepo);
const categoryController = new CategoryController(categoryUseCase);
const instructorUseCase = new InstructorUseCase(
  instructorRepo,
  jwt,
  otp,
  mail,
  bcrypt,
  OtpRep
);
const chapterRepo = new ChapterRepo();
const courseRepo = new CourseRepo();
const courseUseCase = new CourseUseCase(courseRepo, jwt, chapterRepo);
const courseController = new CourseController(courseUseCase);
const enrollRepo = new EnrolledCourseRepo();
const enrollUseCase = new EnrolledCourseUseCase(enrollRepo);
const enrollController = new EnrollController(enrollUseCase);
const instrcutorController = new InstructorController(
  instructorUseCase,
  courseUseCase
);

const chapterUseCase = new ChapterUseCase(chapterRepo);
const chapterController = new ChapterController(chapterUseCase);
const lessonRepo = new LessonRepo();
const lessonUseCase = new LessonUseCase(lessonRepo, chapterRepo);
const lessonController = new LessonController(lessonUseCase);
const questionRepo = new QuestionRepo();
const questionUseCase = new QuestionUseCase(questionRepo);
const questionController = new QuestionController(questionUseCase);
const router = express.Router();

router.post("/sign_up", (req, res) =>
  instrcutorController.SignUpAndSendOtp(req, res)
);
router.post("/resend_otp", (req, res) =>
  instrcutorController.resendOtp(req, res)
);
router.post("/login", (req, res) => instrcutorController.Login(req, res));
router.get("/category", instructorAuth, (req, res) =>
  categoryController.fetchCategory(req, res)
);
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
  .get(instructorAuth, (req, res) => chapterController.getChapter(req, res))
  .patch(instructorAuth, (req, res) =>
    chapterController.updateChapter(req, res)
  );
router.patch("/publish", instructorAuth, (req, res) =>
  courseController.publishCourse(req, res)
);

router
  .route("/lesson")
  .post(instructorAuth, upload.single("video"), (req, res) =>
    lessonController.addChapter(req, res)
  )
  .delete(instructorAuth, (req, res) =>
    lessonController.deleteLesson(req, res)
  );

router
  .route("/profile")
  .get(instructorAuth, (req, res) =>
    instrcutorController.fetchProfile(req, res)
  )
  .post(instructorAuth, (req, res) =>
    instrcutorController.updateProfile(req, res)
  )
  .patch(instructorAuth, upload.single("image"), (req, res) =>
    instrcutorController.updateImage(req, res)
  );

router.get("/course", instructorAuth, (req, res) =>
  courseController.fetchSpecificCourse(req, res)
);
router.get("/enrollments", instructorAuth, (req, res) =>
  enrollController.enrollments(req, res)
);
router.get("/profit", instructorAuth, (req, res) =>
  enrollController.calProfit(req, res)
);
router.get("/get_chat", (req, res) =>
  chatController.fetchInstructorChats(req, res)
);
router.get("/get_conversations", instructorAuth, (req, res) =>
  chatController.fetchConversation(req, res)
);

router.get("/sales", instructorAuth, (req, res) =>
  enrollController.fetchMonthlySales(req, res)
);

router
  .route("/question")
  .post(instructorAuth, (req, res) => questionController.addQuestion(req, res))
  .get(instructorAuth, (req, res) => questionController.fetchQuestion(req, res))
  .delete(instructorAuth, (req, res) =>
    questionController.removeQuestion(req, res)
  );


export default router;
