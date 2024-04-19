import Instructor from "../../domain/instructor";
interface IInstructorRepo {
  findInstructorByEmail(email: string): Promise<Instructor | null>;
  saveInstructorToDatabase(
    instructor: Instructor
  ): Promise<Instructor | null | void>;
  fetchInstructorData(email: string): Promise<Instructor | null>;
  verifyInstructor(email: string): Promise<any>;
  saveGoogleAuth(credential: Instructor): Promise<Instructor>;
  findInstructorById(id: string): Promise<Instructor | null>;
}

export default IInstructorRepo;
