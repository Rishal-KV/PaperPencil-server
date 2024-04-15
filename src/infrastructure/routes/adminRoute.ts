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

const jwt = new Jwt();
const bcypt = new Bcrypt();

const adminRepo = new AdminRepo();
const courseRepo = new CourseRepo();

const courseUseCase = new CourseUseCase(courseRepo,jwt)
let courseController = new CourseController(courseUseCase)
const adminUseCase = new AdminUseCase(adminRepo, jwt, bcypt);
let adminController = new AdminController(adminUseCase);
let categoryRepo = new CategoryRepo();
let categoryUseCase = new CategoryUseCase(categoryRepo);
let categoryController = new CategoryController(categoryUseCase);
const router = express.Router();

router.post("/login", (req, res) => adminController.adminLogin(req, res));
router.get("/instructor_details", (req, res) =>
  adminController.getInstructorData(req, res)
);
router.get("/student_details", (req, res) =>
  adminController.getStudentData(req, res)
);
router.patch("/instructor_action", (req, res) =>
  adminController.instructorAction(req, res)
);
router.patch("/student_action", (req, res) =>
  adminController.studentAction(req, res)
);
router.post("/add_category", (req, res) =>
  categoryController.addCategory(req, res)
);
router.get("/get_category", (req, res) =>
  categoryController.fetchCategory(req, res)
);
router.patch("/action_category", (req, res) =>
  categoryController.actionCategory(req, res)
);

router.route('/course').get((req,res)=>adminController.fetchCourse(req,res))
.patch((req,res)=>courseController.courseAction(req,res))
export default router;
