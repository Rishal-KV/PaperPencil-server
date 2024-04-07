import express from 'express'
import AdminUseCase from '../../useCase/adminUseCase'
import Jwt from '../utils/Jwt';
import AdminRepo from '../repository/adminRepo';
import AdminController from '../../adaptors/controllers/adminController';
import CategoryController from '../../adaptors/controllers/category';
import Bcrypt from '../utils/bcrypt';
import CategoryUseCase from '../../useCase/categoryUseCase';
import CategoryRepo from '../repository/categoryRepo';
const jwt = new Jwt()
const bcypt = new Bcrypt()


const adminRepo = new AdminRepo()
const adminUseCase = new AdminUseCase(adminRepo,jwt,bcypt);
let adminController = new AdminController(adminUseCase)
let categoryRepo = new CategoryRepo()
let categoryUseCase = new CategoryUseCase(categoryRepo)
let categoryController = new CategoryController(categoryUseCase)
const route = express.Router();

route.post('/login',(req,res)=>adminController.adminLogin(req,res));
route.get('/instructor_details',(req,res)=>adminController.getInstructorData(req,res));
route.get('/student_details',(req,res)=>adminController.getStudentData(req,res));
route.patch('/instructor_action',(req,res)=>adminController.instructorAction(req,res));
route.patch('/student_action',(req,res)=>adminController.studentAction(req,res));
route.post('/add_category',(req,res)=> categoryController.addCategory(req,res));
route.get('/get_category',(req,res)=>categoryController.fetchCategory(req,res));
route.patch('/action_category',(req,res)=>categoryController.actionCategory(req,res))

export default route
