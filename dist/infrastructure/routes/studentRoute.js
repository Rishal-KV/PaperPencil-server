"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const studentController_1 = __importDefault(require("../../adaptors/controllers/studentController"));
const studentUseCase_1 = __importDefault(require("../../useCase/studentUseCase"));
const generateOtp_1 = __importDefault(require("../utils/generateOtp"));
const studentRepo_1 = __importDefault(require("../repository/studentRepo"));
const Jwt_1 = __importDefault(require("../utils/Jwt"));
const bcrypt_1 = __importDefault(require("../utils/bcrypt"));
const email_1 = __importDefault(require("../utils/email"));
const otpRepository_1 = __importDefault(require("../repository/otpRepository"));
const courseController_1 = __importDefault(require("../../adaptors/controllers/courseController"));
const courseUseCase_1 = __importDefault(require("../../useCase/courseUseCase"));
const courseRepo_1 = __importDefault(require("../repository/courseRepo"));
const chapter_1 = __importDefault(require("../../useCase/chapter"));
const chapterRepo_1 = __importDefault(require("../repository/chapterRepo"));
const chapter_2 = __importDefault(require("../../adaptors/controllers/chapter"));
const multer_1 = __importDefault(require("../middleware/multer"));
const enrolled_1 = __importDefault(require("../repository/enrolled"));
const enrolledCourse_1 = __importDefault(require("../../useCase/enrolledCourse"));
const enrollController_1 = __importDefault(require("../../adaptors/controllers/enrollController"));
const reviewRepo_1 = __importDefault(require("../repository/reviewRepo"));
const reviewUseCase_1 = __importDefault(require("../../useCase/reviewUseCase"));
const reviewController_1 = __importDefault(require("../../adaptors/controllers/reviewController"));
const studentAuth_1 = __importDefault(require("../middleware/studentAuth"));
const category_1 = __importDefault(require("../../adaptors/controllers/category"));
const categoryUseCase_1 = __importDefault(require("../../useCase/categoryUseCase"));
const categoryRepo_1 = __importDefault(require("../repository/categoryRepo"));
const chatUseCase_1 = __importDefault(require("../../useCase/chatUseCase"));
const chatRepo_1 = __importDefault(require("../repository/chatRepo"));
const chatController_1 = __importDefault(require("../../adaptors/controllers/chatController"));
const favouriteContoller_1 = __importDefault(require("../../adaptors/controllers/favouriteContoller"));
const favouriteRepo_1 = __importDefault(require("../repository/favouriteRepo"));
const favouriteUseCase_1 = __importDefault(require("../../useCase/favouriteUseCase"));
const question_1 = __importDefault(require("../repository/question"));
const questionUseCase_1 = __importDefault(require("../../useCase/questionUseCase"));
const questionController_1 = __importDefault(require("../../adaptors/controllers/questionController"));
const otp = new generateOtp_1.default();
const repository = new studentRepo_1.default();
const courseRepo = new courseRepo_1.default();
const jwt = new Jwt_1.default();
const bcrypt = new bcrypt_1.default();
const sendMail = new email_1.default();
const OtpRep = new otpRepository_1.default();
const courseuseCase = new courseUseCase_1.default(courseRepo, jwt);
const courseController = new courseController_1.default(courseuseCase);
const chapterRepo = new chapterRepo_1.default();
const chapterUseCase = new chapter_1.default(chapterRepo);
const chapterController = new chapter_2.default(chapterUseCase);
const enrollRepo = new enrolled_1.default();
const enrollUseCase = new enrolledCourse_1.default(enrollRepo);
const enrollController = new enrollController_1.default(enrollUseCase);
const reviewRepo = new reviewRepo_1.default();
const reviewUseCase = new reviewUseCase_1.default(reviewRepo);
const reviewController = new reviewController_1.default(reviewUseCase);
const chatRepo = new chatRepo_1.default();
const chatUseCase = new chatUseCase_1.default(chatRepo);
const chatController = new chatController_1.default(chatUseCase);
const studentUseCase = new studentUseCase_1.default(otp, repository, jwt, bcrypt, sendMail, OtpRep, courseRepo);
const controller = new studentController_1.default(studentUseCase);
const favouriteRepo = new favouriteRepo_1.default();
const favouriteUseCase = new favouriteUseCase_1.default(favouriteRepo);
const favouriteController = new favouriteContoller_1.default(favouriteUseCase);
const router = express_1.default.Router();
const categoryRepo = new categoryRepo_1.default();
const categoryUseCase = new categoryUseCase_1.default(categoryRepo);
const categoryController = new category_1.default(categoryUseCase);
const questionRepo = new question_1.default();
const questionUseCase = new questionUseCase_1.default(questionRepo);
const questionController = new questionController_1.default(questionUseCase);
router.post("/login_student", (req, res) => controller.studentLogin(req, res));
router.post("/signup_student", (req, res) => controller.SignUpAndSendOtp(req, res));
router.get("/verify_user", (req, res) => controller.verifyByEmail(req, res));
router.post("/verify_otp", (req, res) => controller.authenticateStudent(req, res));
router.post("/google_login", (req, res) => controller.googleLogin(req, res));
router.get("/get_course", (req, res) => courseController.fetchCourse(req, res));
router
    .route("/getspecific_course")
    .get((req, res) => courseController.fetchSpecificCourse(req, res))
    .patch((req, res) => courseController.updateCourse(req, res));
router.get("/get_chapter", (req, res) => chapterController.getChapter(req, res));
router.post("/changepassword", (req, res) => controller.forgotPassword(req, res));
router.post("/setpassword", (req, res) => controller.setForgotPassword(req, res));
router
    .route("/profile/:studentId")
    .get(studentAuth_1.default, (req, res) => controller.getStudentData(req, res))
    .patch(studentAuth_1.default, (req, res) => controller.updateProfile(req, res));
router.patch("/update_image", studentAuth_1.default, multer_1.default.single("image"), (req, res) => controller.updateImage(req, res));
router.post("/stripe_payment", studentAuth_1.default, (req, res) => courseController.payment(req, res));
router
    .route("/enroll")
    .post(studentAuth_1.default, (req, res) => enrollController.enroll(req, res))
    .get(studentAuth_1.default, (req, res) => enrollController.checkEnroll(req, res));
router.post("/create_chat", studentAuth_1.default, (req, res) => enrollController.createChat(req, res));
router
    .route("/review")
    .post((req, res) => reviewController.addReview(req, res))
    .get((req, res) => reviewController.fetchReviews(req, res));
router.get("/check_review", (req, res) => reviewController.checkReview(req, res));
router.post("/forgot_confirm_otp", (req, res) => controller.forgotConfirmOtp(req, res));
router.get("/enrolled_course", studentAuth_1.default, (req, res) => enrollController.fetchCourse(req, res));
router.get("/category", (req, res) => categoryController.fetchCategory(req, res));
router
    .route("/progress")
    .post(studentAuth_1.default, (req, res) => enrollController.saveProgress(req, res))
    .get(studentAuth_1.default, (req, res) => enrollController.checkProgress(req, res));
router.post("/progress", studentAuth_1.default, (req, res) => enrollController.saveProgress(req, res));
router.get("/get_instructor", studentAuth_1.default, (req, res) => courseController.getInstructor(req, res));
router.get("/get_chatlist", studentAuth_1.default, (req, res) => chatController.fetchChatList(req, res));
router.get("/get_conversations", studentAuth_1.default, (req, res) => chatController.fetchConversation(req, res));
router
    .route("/favourite")
    .post(studentAuth_1.default, (req, res) => favouriteController.addToFavourite(req, res))
    .get(studentAuth_1.default, (req, res) => favouriteController.fetchFavourites(req, res));
router.post("/answer", studentAuth_1.default, (req, res) => questionController.answerToQuestion(req, res));
router.get("/download_certificate/:studentId/:courseId", studentAuth_1.default, (req, res) => enrollController.generateCertificate(req, res));
router.post("/resend_otp", (req, res) => controller.resendOtp(req, res));
router.post("/save_courseprogress", studentAuth_1.default, (req, res) => enrollController.courseProgress(req, res));
router.get("/invoice", studentAuth_1.default, (req, res) => enrollController.generateInvoice(req, res));
exports.default = router;
