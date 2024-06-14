import Instructor from "../../domain/instructor";
interface IInstructorRepo {
  findInstructorByEmail(email: string): Promise<Instructor | null>;
  setInstructor(email:string,password:string):Promise<Instructor | null>
  saveInstructorToDatabase(
    instructor: Instructor
  ): Promise<Instructor | null | void>;
  fetchInstructorData(email: string): Promise<Instructor | null>;
  verifyInstructor(email: string): Promise<any>;
  saveGoogleAuth(credential: Instructor): Promise<Instructor>;
  findInstructorById(id: string): Promise<Instructor | null>;
  updateProfile(id:string,instructorData:Instructor):Promise<Instructor>
  updateImage(id:string, imageUrl:string) : Promise<Boolean>
  updatePassword(email:string,password:string):Promise<boolean>
}

export default IInstructorRepo;
