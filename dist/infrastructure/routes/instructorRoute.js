"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const instructorUseCase_1 = __importDefault(require("../../useCase/instructorUseCase"));
const instrcutorController_1 = __importDefault(require("../../adaptors/controllers/instrcutorController"));
const instructorRepo_1 = __importDefault(require("../repository/instructorRepo"));
const Jwt_1 = __importDefault(require("../utils/Jwt"));
const generateOtp_1 = __importDefault(require("../utils/generateOtp"));
const email_1 = __importDefault(require("../utils/email"));
const bcrypt_1 = __importDefault(require("../utils/bcrypt"));
const otpRepository_1 = __importDefault(require("../repository/otpRepository"));
const courseRepo_1 = __importDefault(require("../repository/courseRepo"));
const courseUseCase_1 = __importDefault(require("../../useCase/courseUseCase"));
const courseController_1 = __importDefault(require("../../adaptors/controllers/courseController"));
const instructorAuth_1 = __importDefault(require("../middleware/instructorAuth"));
const chapterRepo_1 = __importDefault(require("../repository/chapterRepo"));
const chapter_1 = __importDefault(require("../../useCase/chapter"));
const chapter_2 = __importDefault(require("../../adaptors/controllers/chapter"));
const lesson_1 = __importDefault(require("../../adaptors/controllers/lesson"));
const lessonUseCase_1 = __importDefault(require("../../useCase/lessonUseCase"));
const lessonRepo_1 = __importDefault(require("../repository/lessonRepo"));
const multer_1 = __importDefault(require("../middleware/multer"));
const enrolled_1 = __importDefault(require("../repository/enrolled"));
const enrolledCourse_1 = __importDefault(require("../../useCase/enrolledCourse"));
const enrollController_1 = __importDefault(require("../../adaptors/controllers/enrollController"));
const chatRepo_1 = __importDefault(require("../repository/chatRepo"));
const chatUseCase_1 = __importDefault(require("../../useCase/chatUseCase"));
const chatController_1 = __importDefault(require("../../adaptors/controllers/chatController"));
const categoryRepo_1 = __importDefault(require("../repository/categoryRepo"));
const categoryUseCase_1 = __importDefault(require("../../useCase/categoryUseCase"));
const category_1 = __importDefault(require("../../adaptors/controllers/category"));
const question_1 = __importDefault(require("../repository/question"));
const questionUseCase_1 = __importDefault(require("../../useCase/questionUseCase"));
const questionController_1 = __importDefault(require("../../adaptors/controllers/questionController"));
const chatRepo = new chatRepo_1.default();
const chatUseCase = new chatUseCase_1.default(chatRepo);
const chatController = new chatController_1.default(chatUseCase);
const OtpRep = new otpRepository_1.default();
const otp = new generateOtp_1.default();
const jwt = new Jwt_1.default();
const mail = new email_1.default();
const instructorRepo = new instructorRepo_1.default();
const bcrypt = new bcrypt_1.default();
const categoryRepo = new categoryRepo_1.default();
const categoryUseCase = new categoryUseCase_1.default(categoryRepo);
const categoryController = new category_1.default(categoryUseCase);
const instructorUseCase = new instructorUseCase_1.default(instructorRepo, jwt, otp, mail, bcrypt, OtpRep);
const chapterRepo = new chapterRepo_1.default();
const courseRepo = new courseRepo_1.default();
const courseUseCase = new courseUseCase_1.default(courseRepo, jwt, chapterRepo);
const courseController = new courseController_1.default(courseUseCase);
const enrollRepo = new enrolled_1.default();
const enrollUseCase = new enrolledCourse_1.default(enrollRepo);
const enrollController = new enrollController_1.default(enrollUseCase);
const instrcutorController = new instrcutorController_1.default(instructorUseCase, courseUseCase);
const chapterUseCase = new chapter_1.default(chapterRepo);
const chapterController = new chapter_2.default(chapterUseCase);
const lessonRepo = new lessonRepo_1.default();
const lessonUseCase = new lessonUseCase_1.default(lessonRepo, chapterRepo);
const lessonController = new lesson_1.default(lessonUseCase);
const questionRepo = new question_1.default();
const questionUseCase = new questionUseCase_1.default(questionRepo);
const questionController = new questionController_1.default(questionUseCase);
const router = express_1.default.Router();
router.post("/sign_up", (req, res) => instrcutorController.SignUpAndSendOtp(req, res));
router.post("/resend_otp", (req, res) => instrcutorController.resendOtp(req, res));
router.post("/login", (req, res) => instrcutorController.Login(req, res));
router.get("/category", instructorAuth_1.default, (req, res) => categoryController.fetchCategory(req, res));
router.post("/confirm_otp", (req, res) => instrcutorController.authenticateInstructor(req, res));
router.post("/add_course", instructorAuth_1.default, multer_1.default.single("image"), (req, res) => courseController.addCourse(req, res));
router
    .route("/course_list")
    .get(instructorAuth_1.default, (req, res) => courseController.fetchINstructorCourse(req, res))
    .patch(instructorAuth_1.default, (req, res) => courseController.courseList(req, res));
router.get("/dashboard", instructorAuth_1.default, (req, res) => instrcutorController.dashboard(req, res));
router.post("/googleAuth", (req, res) => instrcutorController.googleLogin(req, res));
router
    .route("/chapter")
    .post(instructorAuth_1.default, (req, res) => chapterController.addChapter(req, res))
    .get(instructorAuth_1.default, (req, res) => chapterController.getChapter(req, res))
    .patch(instructorAuth_1.default, (req, res) => chapterController.updateChapter(req, res));
router.patch("/publish", instructorAuth_1.default, (req, res) => courseController.publishCourse(req, res));
router
    .route("/lesson")
    .post(instructorAuth_1.default, multer_1.default.single("video"), (req, res) => lessonController.addChapter(req, res))
    .delete(instructorAuth_1.default, (req, res) => lessonController.deleteLesson(req, res));
router
    .route("/profile")
    .get(instructorAuth_1.default, (req, res) => instrcutorController.fetchProfile(req, res))
    .post(instructorAuth_1.default, (req, res) => instrcutorController.updateProfile(req, res))
    .patch(instructorAuth_1.default, multer_1.default.single("image"), (req, res) => instrcutorController.updateImage(req, res));
router.get("/course", instructorAuth_1.default, (req, res) => courseController.fetchSpecificCourse(req, res));
router.get("/enrollments", instructorAuth_1.default, (req, res) => enrollController.enrollments(req, res));
router.get("/profit", instructorAuth_1.default, (req, res) => enrollController.calProfit(req, res));
router.get("/get_chat", (req, res) => chatController.fetchInstructorChats(req, res));
router.get("/get_conversations", instructorAuth_1.default, (req, res) => chatController.fetchConversation(req, res));
router.get("/sales", instructorAuth_1.default, (req, res) => enrollController.fetchMonthlySales(req, res));
router
    .route("/question")
    .post(instructorAuth_1.default, (req, res) => questionController.addQuestion(req, res))
    .get(instructorAuth_1.default, (req, res) => questionController.fetchQuestion(req, res))
    .delete(instructorAuth_1.default, (req, res) => questionController.removeQuestion(req, res));
router.post('/change-password', instructorAuth_1.default, (req, res) => instrcutorController.updatePassword(req, res));
exports.default = router;
