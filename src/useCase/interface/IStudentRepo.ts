import student from "../../domain/student";

interface IStudentRepo {
  findStudentByEMail(email: string): Promise<student | null>;
  saveStudentToDatabase(student: student): Promise<student | void | null>;
  fetchStudentData(email: string): Promise<student | null>;
  verifyStudent(email: string): Promise<any>;
  saveGoogleAuth(credential: student): Promise<student>;
  updateById(id: string): Promise<void>;
  setForgotPassword(email: string, password: string): Promise<boolean>;
  getStudentById(id:string):Promise<student | null>
  updateProfile(id:string,data:student):Promise<boolean>
  updateImage(id:string,image):Promise<boolean>
}

export default IStudentRepo;
