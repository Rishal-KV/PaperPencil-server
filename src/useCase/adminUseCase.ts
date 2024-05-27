import Admin from "../domain/admin";
import AdminRepo from "../infrastructure/repository/adminRepo";
import Jwt from "../infrastructure/utils/Jwt";
import Bcrypt from "../infrastructure/utils/bcrypt";

class AdminUseCase {
  private adminRepo: AdminRepo;
  private Jwt: Jwt;
  private Bcrypt: Bcrypt;
  constructor(adminRepo: AdminRepo, jwt: Jwt, bcypt: Bcrypt) {
    this.adminRepo = adminRepo;
    this.Jwt = jwt;
    this.Bcrypt = bcypt;
  }
  async adminSignIn(signInData: Admin) {
    try {
      let { email } = signInData;
      let adminFound = await this.adminRepo.findAdminByEmail(email);
      if (adminFound) {
        let verifyPassword = await this.Bcrypt.encryptPass(
          signInData.password,
          adminFound.password
        );
        if (verifyPassword) {
         
          let token = this.Jwt.createToken(adminFound._id,"admin");
          return { status: true, token: token,admin : adminFound.email };
        } else {
          return { status: false };
        }
      } else {
        return { adminFound: false };
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getInstructorData() {
    try {
      let instructorData = await this.adminRepo.findInstructorData();
      return instructorData;
    } catch (error: any) {
      console.log(error.message);
    }
  }

  async getStudentData() {
    let studentData = await this.adminRepo.findStudentData();
    return studentData;
  }

  async blockInstructor(id: string) {
    try {
      let blocked_unblocked = await this.adminRepo.blockInstructor(id);
      return blocked_unblocked;
    } catch (error) {
      console.log(error);
    }
  }

  async blockStudent(id: string) {
    try {
      let blocked_unblocked = await this.adminRepo.blockStudent(id);
      return blocked_unblocked;
    } catch (error) {
      console.log(error);
    }
  }
  async fetchCourse(){
    try {
      let course = await this.adminRepo.fetchCourse();
      if (course) {
        return {course:course}
      }else{
        throw new Error('no course found')
      }
    } catch (error) {
      console.log(error);
      
    }
  }
  async fetchProfit() {
    try {
      const profit = await this.adminRepo.fetchProfit();
      return profit
    } catch (error) {
      console.log(error);
      
    }
  }
}
export default AdminUseCase;
