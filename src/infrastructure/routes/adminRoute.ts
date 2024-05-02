import express from "express";
import AdminUseCase from "../../useCase/adminUseCase";
import Jwt from "../utils/Jwt";
import AdminRepo from "../repository/adminRepo";
import AdminController from "../../adaptors/controllers/adminController";
import CategoryController from "../../adaptors/controllers/category";
import Bcrypt from "../utils/bcrypt";
import CategoryUseCase from "../../useCase/categoryUseCase";
import CategoryRepo from "../repository/categoryRepo";
import CourseController from "../../adaptors/controllers/courseController";
import CourseUseCase from "../../useCase/courseUseCase";
import CourseRepo from "../repository/courseRepo";
import { adminAuth } from "../middleware/adminAuth";
import ChapterController from "../../adaptors/controllers/chapter";
import ChapterUseCase from "../../useCase/chapter";
import ChapterRepo from "../repository/chapterRepo";
const jwt = new Jwt();
const bcypt = new Bcrypt();

const adminRepo = new AdminRepo();
const courseRepo = new CourseRepo();

const courseUseCase = new CourseUseCase(courseRepo,jwt)
const courseController = new CourseController(courseUseCase)
const adminUseCase = new AdminUseCase(adminRepo, jwt, bcypt);
const adminController = new AdminController(adminUseCase);
const categoryRepo = new CategoryRepo();
const categoryUseCase = new CategoryUseCase(categoryRepo);
const categoryController = new CategoryController(categoryUseCase);
const chapterRepo = new ChapterRepo()
const chapterUseCase = new ChapterUseCase(chapterRepo)
const chapterContoller = new ChapterController(chapterUseCase)
const router = express.Router();

router.post("/login", (req, res) => adminController.adminLogin(req, res));
router.get("/instructor_details",adminAuth, (req, res) =>
  adminController.getInstructorData(req, res)
);
router.get("/student_details",adminAuth, (req, res) =>
  adminController.getStudentData(req, res)
);
router.patch("/instructor_action", adminAuth,(req, res) =>
  adminController.instructorAction(req, res)
);
router.patch("/student_action",adminAuth, (req, res) =>
  adminController.studentAction(req, res)
);
router.post("/add_category",adminAuth, (req, res) =>
  categoryController.addCategory(req, res)
);
router.get("/get_category",adminAuth, (req, res) =>
  categoryController.fetchCategory(req, res)
);
router.patch("/action_category", adminAuth,(req, res) =>
  categoryController.actionCategory(req, res)
);
router.patch('/edit_category',(req,res) => categoryController.updateCategory(req,res))
router.get('/chapter',(req,res) => chapterContoller.getChapter(req,res))
router.route('/course').get(adminAuth,(req,res)=>adminController.fetchCourse(req,res))
.patch(adminAuth,(req,res)=>courseController.courseAction(req,res));
router.get('/specific_category',(req,res)=>categoryController.getSpecificCategory(req,res));
export default router;
