"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chapter_1 = __importDefault(require("../database/chapter"));
const enrolledCourse_1 = __importDefault(require("../database/enrolledCourse"));
const chat_1 = __importDefault(require("../database/chat"));
const favourites_1 = __importDefault(require("../database/favourites"));
const mongoose_1 = require("mongoose");
class EnrolledCourseRepo {
    async checkPayment(studentId, courseId) {
        try {
            const checkPayment = await enrolledCourse_1.default.findOne({
                studentId,
                course: courseId,
                payment: true,
            });
            if (checkPayment) {
                return true;
            }
            else {
                return false;
            }
        }
        catch (error) {
            throw error;
        }
    }
    async purchaseCourse(studentId, courseId) {
        try {
            const enrolled = await enrolledCourse_1.default.findOne({
                studentId: studentId,
                course: courseId,
            });
            if (enrolled) {
                return { message: "already enrolled" };
            }
            else {
                const enroll = await enrolledCourse_1.default.create({
                    studentId: studentId,
                    course: courseId,
                    payment: true,
                });
                if (enroll) {
                    await favourites_1.default.findOneAndUpdate({ studentId: studentId }, {
                        $pull: { favourites: courseId },
                    });
                    return true;
                }
                else {
                    return false;
                }
            }
        }
        catch (error) {
            throw error;
        }
    }
    async checkEnroll(studentId, courseId) {
        try {
            const enrolled = await enrolledCourse_1.default.findOne({
                studentId: studentId,
                course: courseId,
            });
            if (enrolled) {
                return true;
            }
            else {
                return false;
            }
        }
        catch (error) {
            throw error;
        }
    }
    async fetchEnrolledCourse(studentId) {
        const enrolledCourse = await enrolledCourse_1.default
            .find({ studentId: studentId })
            .populate({
            path: "course",
            populate: { path: "instructor", model: "instructor" },
        });
        if (enrolledCourse) {
            return enrolledCourse;
        }
        else {
            return null;
        }
    }
    async fetchEnrollments(courseId) {
        const enrollments = await enrolledCourse_1.default
            .find({ course: courseId })
            .populate("studentId");
        if (enrollments) {
            return enrollments;
        }
        else {
            return null;
        }
    }
    async profitCalc(instructorId) {
        try {
            const profit = await enrolledCourse_1.default.aggregate([
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
                        as: "courseInfo",
                    },
                },
                { $unwind: "$courseInfo" },
                {
                    $match: {
                        "courseInfo.instructor": instructorId,
                    },
                },
                {
                    $group: {
                        _id: null,
                        totalIncome: {
                            $sum: { $multiply: ["$courseInfo.price", 0.8] },
                        },
                    },
                },
            ]);
            return profit;
        }
        catch (error) {
            throw error;
        }
    }
    async saveProgress(courseId, studentId, lessonId // Corrected typo in parameter name
    ) {
        await enrolledCourse_1.default.findOneAndUpdate({ course: courseId, studentId: studentId }, {
            $push: {
                completedLessons: lessonId, // Corrected typo in parameter name
            },
        });
        const chapters = await chapter_1.default.find({ course: courseId });
        const enrolledCourse = await enrolledCourse_1.default.findOne({
            course: courseId,
            studentId,
        });
        const completedChapter = []; // Define completedChapter as Types.ObjectId[]
        for (const chapter of chapters) {
            if (chapter.lessons) {
                // Check if chapter.lessons is defined
                const LessonIds = chapter.lessons.map((id) => new mongoose_1.Types.ObjectId(id)); // Convert string array to Types.ObjectId array
                const allLessonsCompleted = LessonIds.every((lessonId) => enrolledCourse?.completedLessons
                    ?.map(String)
                    .includes(String(lessonId)));
                if (allLessonsCompleted) {
                    completedChapter.push(new mongoose_1.Types.ObjectId(chapter._id)); // Convert chapter._id to Types.ObjectId
                }
            }
        }
        if (enrolledCourse) {
            // Ensure enrolledCourse.completedChapters is typed as Types.ObjectId[]
            enrolledCourse.completedChapters = completedChapter;
            await enrolledCourse.save();
        }
    }
    async checkProgress(studentId, courseId) {
        try {
            const enrolledCourse = await enrolledCourse_1.default.findOne({
                studentId: studentId,
                course: courseId,
            });
            if (enrolledCourse) {
                return enrolledCourse;
            }
            else {
                return null;
            }
        }
        catch (error) {
            throw error;
        }
    }
    async createChat(studentId, instructorId) {
        const chatExist = await chat_1.default.findOne({
            members: { $all: [studentId, instructorId] },
        });
        if (!chatExist) {
            const newChat = chat_1.default.create({
                members: [studentId, instructorId],
            });
            return true;
        }
        return true;
    }
    async fetchMonthlySales(instructorId) {
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
                    $match: {
                        "courseDetails.instructor": instructorId,
                    },
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
                        totalSales: { $sum: { $multiply: ["$coursePrice", 0.8] } },
                        enrollmentCount: { $sum: 1 },
                    },
                },
                {
                    $sort: { "_id.year": 1, "_id.month": 1 },
                },
            ]);
            // Create an array of all months within the year range found in the results
            if (monthlySales) {
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
                    });
                    currentDate.setMonth(currentDate.getMonth() + 1);
                }
                return completeMonthlySales;
            }
        }
        catch (error) {
            console.error("Error fetching monthly sales:", error);
            throw error;
        }
    }
    async saveCourseProgress(courseId, studentId, date) {
        try {
            const res = await enrolledCourse_1.default.findOneAndUpdate({ course: courseId, studentId: studentId }, { $set: { courseStatus: true, completedDate: date } });
            console.log(res, "res");
        }
        catch (error) {
            console.error("Error updating course progress:", error);
        }
    }
    async isCourseCompleted(courseId, studentId) {
        try {
            const completed = await enrolledCourse_1.default
                .findOne({
                course: courseId,
                studentId: studentId,
            })
                .populate("studentId")
                .populate("course");
            if (completed) {
                return completed;
            }
            else {
                return null;
            }
        }
        catch (error) {
            throw error;
        }
    }
    async courseData(courseId, studentId) {
        try {
            const course = await enrolledCourse_1.default
                .findOne({ course: courseId }, { studentId: studentId })
                .populate("course")
                .populate("studentId")
                .select("enrolled");
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
}
exports.default = EnrolledCourseRepo;
