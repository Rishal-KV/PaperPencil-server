import IInstructorRepo from "../../useCase/interface/IInstructorRepo";
import Instructor from "../../domain/instructor";
import instructorModel from "../database/instructorModel";
class InstructorRepo implements IInstructorRepo {

    findInstructorByEmail = async (email: string): Promise<Instructor | null> => {
        try {
            let instructorData = await instructorModel.findOne({ email: email })
         
           
            
            return instructorData ? instructorData.toObject() : null
        } catch (error) {
            throw new Error('unable to fetch instructor data')
        }


    }

    saveInstructorToDatabase = async (instructor: Instructor): Promise<Instructor | null | void> => {
        try {
            let instructorData = new instructorModel(instructor);
            instructorData.save();
            return instructorData ? instructorData.toObject() : null

        } catch (error) {
            console.log(error);
            
        }
    }
    async fetchInstructorData(email: string): Promise<Instructor | null> {
        try {
            let instructor = await instructorModel.findOne({email},{email:1,name:1})
            return instructor
        } catch (error) {
            throw error
        }
    }
    async verifyInstructor(email: string): Promise<any> {
         await instructorModel.findOneAndUpdate({email:email},{
            is_Verified : true
        })
    
    }
    async saveGoogleAuth(credential: any): Promise<void> {
        try {
          let saved = await instructorModel.create({
            name: credential.name,
            email: credential.email,
            is_Verified : true,
            googleId: credential.sub,
          });
        } catch (error) {
          throw error;
        }
      }
}

export default InstructorRepo