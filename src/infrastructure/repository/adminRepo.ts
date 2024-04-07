import Admin from "../../domain/admin";
import IAdminRepo from "../../useCase/interface/IAdminRepo";
import adminModel from "../database/admin";
import studentModel from "../database/studentModel";
import student from "../../domain/student";
import instructorModel from "../database/instructorModel";
class AdminRepo implements IAdminRepo {
   
    
    async findAdminByEmail(email: string): Promise<Admin | null | void> {

        try {
            let adminData = await adminModel.findOne({ email: email });
            return adminData ? adminData.toObject() : null
        } catch (error) {
            console.log(error);

        }


    }

    async findStudentData(): Promise<student[]> {
        try {
            let students = await studentModel.find();
            return students
        } catch (error) {
            console.log(error);

            return [];
        }
    }

    async findInstructorData() {
        try {
            let instructors = await instructorModel.find()
            return instructors
        } catch (error) {
            console.log(error);
            return []
        }
    }

   async blockInstructor(id: string): Promise<boolean> {
        try {
            let instructor = await  instructorModel.findById(id)
            if (instructor?.is_blocked) {
                await instructorModel.findOneAndUpdate({_id :id},{
                    is_blocked : false
                })
                return true
            }else{
                await instructorModel.findOneAndUpdate({_id :id},{
                    is_blocked : true

                })
                return true
            }
        } catch (error) {
            return false
        }
    }

    async blockStudent(id: string): Promise<boolean> {
        try {
            let student = await studentModel.findById(id);
            console.log(student);
            
            if (student?.is_blocked) {
                let eheh = await studentModel.findOneAndUpdate({_id :id},{
                    is_blocked : false
                },{new:true})
                console.log(eheh);
                
                
                
                return true
            }else{
                
                
                await studentModel.findOneAndUpdate({_id : id},{
                    is_blocked : true
                })
                return true
            }
           
        } catch (error) {
            return false
        }
    }

}

export default AdminRepo