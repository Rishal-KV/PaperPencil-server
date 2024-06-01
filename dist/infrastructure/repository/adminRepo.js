"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const admin_1 = __importDefault(require("../database/admin"));
const studentModel_1 = __importDefault(require("../database/studentModel"));
const instructorModel_1 = __importDefault(require("../database/instructorModel"));
const courseModel_1 = __importDefault(require("../database/courseModel"));
const enrolledCourse_1 = __importDefault(require("../database/enrolledCourse"));
class AdminRepo {
    async findAdminByEmail(email) {
        try {
            let adminData = await admin_1.default.findOne({ email: email });
            return adminData ? adminData.toObject() : null;
        }
        catch (error) {
            console.log(error);
        }
    }
    async findStudentData() {
        try {
            let students = await studentModel_1.default.find();
            return students;
        }
        catch (error) {
            console.log(error);
            return [];
        }
    }
    async findInstructorData() {
        try {
            let instructors = await instructorModel_1.default.find();
            return instructors;
        }
        catch (error) {
            console.log(error);
            return [];
        }
    }
    async blockInstructor(id) {
        try {
            let instructor = await instructorModel_1.default.findById(id);
            if (instructor?.is_blocked) {
                await instructorModel_1.default.findOneAndUpdate({ _id: id }, {
                    is_blocked: false,
                });
                return true;
            }
            else {
                await instructorModel_1.default.findOneAndUpdate({ _id: id }, {
                    is_blocked: true,
                });
                return true;
            }
        }
        catch (error) {
            return false;
        }
    }
    async blockStudent(id) {
        try {
            let student = await studentModel_1.default.findById(id);
            if (student?.is_blocked) {
                let eheh = await studentModel_1.default.findOneAndUpdate({ _id: id }, {
                    is_blocked: false,
                }, { new: true });
                return true;
            }
            else {
                await studentModel_1.default.findOneAndUpdate({ _id: id }, {
                    is_blocked: true,
                });
                return true;
            }
        }
        catch (error) {
            return false;
        }
    }
    async fetchCourse() {
        try {
            let course = await courseModel_1.default
                .find({ publish: true })
                .populate("instructor");
            if (course) {
                return course;
            }
            else {
                return null;
            }
        }
        catch (error) {
            throw error;
        }
    }
    async fetchProfit() {
        try {
            const monthlySales = await enrolledCourse_1.default.aggregate([
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
            const endDate = new Date(monthlySales[monthlySales.length - 1]._id.year, 11); // End of the last year
            const completeMonthlySales = [];
            let currentDate = startDate;
            while (currentDate <= endDate) {
                const year = currentDate.getFullYear();
                const month = currentDate.getMonth() + 1; // getMonth() is zero-based
                const monthlySale = monthlySales.find((sale) => sale._id.year === year && sale._id.month === month);
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
        }
        catch (error) {
            console.error("Error fetching monthly sales:", error);
            throw error;
        }
    }
}
exports.default = AdminRepo;
