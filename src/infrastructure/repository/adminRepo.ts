import Admin from "../../domain/admin";
import IAdminRepo from "../../useCase/interface/IAdminRepo";
import adminModel from "../database/admin";
import studentModel from "../database/studentModel";
import student from "../../domain/student";
import instructorModel from "../database/instructorModel";
import Course from "../../domain/course";
import courseModel from "../database/courseModel";
import { CompleteMonthlySales } from "../../domain/admin";
import { MonthlySales } from "../../domain/admin";
import enrolledCourseModel from "../database/enrolledCourse";
import Instructor from "../../domain/instructor";
class AdminRepo implements IAdminRepo {
  async findAdminByEmail(email: string): Promise<Admin | null | void> {
    try {
      let adminData = await adminModel.findOne({ email: email });
      return adminData ? adminData.toObject() : null;
    } catch (error) {
      console.log(error);
    }
  }

  async findStudentData(limit:number,skip:number,page:number): Promise<{student:student[],page:number,totalPage:number} | null> {
    try {
      const totalCourse = await studentModel.countDocuments();
      let students = await studentModel.find().skip(skip).limit(limit);;
      return {student:students,page, totalPage:Math.floor(totalCourse / limit)}
    } catch (error) {
      console.log(error);

      return null;
    }
  }

  async findInstructorData(limit:number,skip:number,page:number):Promise<{instructor:Instructor[],page:number,totalPage:number} | null> {
    try {
      const totalCourse = await instructorModel.countDocuments();
      let instructors = await instructorModel.find().skip(skip).limit(limit);
       return {instructor:instructors,page, totalPage:Math.floor(totalCourse / limit)}
      
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async blockInstructor(id: string): Promise<boolean> {
    try {
      let instructor = await instructorModel.findById(id);
      if (instructor?.is_blocked) {
        await instructorModel.findOneAndUpdate(
          { _id: id },
          {
            is_blocked: false,
          }
        );
        return true;
      } else {
        await instructorModel.findOneAndUpdate(
          { _id: id },
          {
            is_blocked: true,
          }
        );
        return true;
      }
    } catch (error) {
      return false;
    }
  }

  async blockStudent(id: string): Promise<boolean> {
    try {
      let student = await studentModel.findById(id);

      if (student?.is_blocked) {
        let eheh = await studentModel.findOneAndUpdate(
          { _id: id },
          {
            is_blocked: false,
          },
          { new: true }
        );

        return true;
      } else {
        await studentModel.findOneAndUpdate(
          { _id: id },
          {
            is_blocked: true,
          }
        );
        return true;
      }
    } catch (error) {
      return false;
    }
  }
  async fetchCourse(limit:number,skip:number,page:number): Promise<{course:Course[], page:number, totalPage:number} | null> {
    try {
      const totalCourse = await courseModel.countDocuments({publish:true});
     
      
      let course = await courseModel
        .find({ publish: true }).sort({createdAt:-1}).skip(skip).limit(limit)
        .populate("instructor");
      if (course) {
        return  {course, page, totalPage:Math.floor(totalCourse / limit)};
      } else {
        return null;
      }
    } catch (error) {
      throw error;
    }
  }
  async fetchProfit(): Promise<CompleteMonthlySales[]> {
    try {
      const monthlySales: MonthlySales[] = await enrolledCourseModel.aggregate([
        {
          $addFields: {
            course: { $toObjectId: "$course" },
          },
        },
        {
          $lookup: {
            from: "courses",
            localField: "course",
            foreignField: "_id",
            as: "courseDetails",
          },
        },
        {
          $unwind: "$courseDetails",
        },
        {
          $project: {
            year: { $year: "$enrolled" },
            month: { $month: "$enrolled" },
            coursePrice: "$courseDetails.price",
          },
        },
        {
          $group: {
            _id: { year: "$year", month: "$month" },
            totalSales: { $sum: "$coursePrice" },
            enrollmentCount: { $sum: 1 },
          },
        },
        {
          $sort: { "_id.year": 1, "_id.month": 1 },
        },
      ]);
  
      // Create an array of all months within the year range found in the results
      const startDate = new Date(monthlySales[0]._id.year, 0); // Start of the first year
      const endDate = new Date(
        monthlySales[monthlySales.length - 1]._id.year,
        11
      ); // End of the last year
  
      const completeMonthlySales: CompleteMonthlySales[] = [];
      let currentDate = startDate;
  
      while (currentDate <= endDate) {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1; // getMonth() is zero-based
  
        const monthlySale = monthlySales.find(
          (sale) => sale._id.year === year && sale._id.month === month
        );
  
        completeMonthlySales.push({
          year,
          month,
          totalSales: monthlySale ? monthlySale.totalSales : 0,
          enrollmentCount: monthlySale ? monthlySale.enrollmentCount : 0,
          profit: monthlySale ? monthlySale.totalSales * 0.20 : 0, // Calculate 20% profit
        });
  
        currentDate.setMonth(currentDate.getMonth() + 1);
      }
  
      return completeMonthlySales;
    } catch (error) {
      console.error("Error fetching monthly sales:", error);
      throw error;
    }
  }
}

export default AdminRepo;
