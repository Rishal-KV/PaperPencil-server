"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const courseModel_1 = __importDefault(require("../database/courseModel"));
class CourseRepo {
    async saveCourseToDataBase(course, instructor) {
        try {
            let { name, price, description, image, category } = course;
            let saved = await courseModel_1.default.create({
                instructor: instructor,
                name: name,
                price: price,
                description: description,
                category: category,
                image: image,
            });
            if (saved) {
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
    async fetchCourseById(id, limit, skip, page) {
        try {
            let course = await courseModel_1.default
                .find({ instructor: id })
                .limit(limit)
                .skip(skip)
                .sort({ createdAt: -1 });
            const totalCourse = await courseModel_1.default.countDocuments({ instructor: id });
            if (course) {
                return {
                    course,
                    page,
                    totalPage: Math.ceil(totalCourse / limit),
                };
            }
            else {
                return null;
            }
        }
        catch (error) {
            throw error;
        }
    }
    async fetchCourse(search, category, price, limit, skip, page = 1) {
        try {
            // Construct the base query
            let query = {
                approved: true,
                listed: true,
            };
            // Apply category filter if category is provided
            if (category) {
                query.category = category;
            }
            // Apply search criteria if search is provided
            if (search) {
                query.$or = [
                    { name: { $regex: new RegExp(search, "i") } },
                    { description: { $regex: new RegExp(search, "i") } },
                ];
            }
            // Apply sorting based on price if provided
            const sortOptions = {};
            if (price !== "") {
                sortOptions.price = price === "desc" ? -1 : 1;
            }
            // Fetch total number of courses matching the query
            const totalCourses = await courseModel_1.default.countDocuments(query);
            // Calculate total pages
            const totalPages = Math.ceil(totalCourses / limit);
            // Ensure the page does not exceed total pages
            const validatedPage = Math.min(page, totalPages) || 1;
            // Calculate skip value based on validated page and limit
            const skipValue = (validatedPage - 1) * limit;
            // Fetch courses based on the constructed query
            const courses = await courseModel_1.default
                .find(query)
                .sort(sortOptions)
                .populate("instructor")
                .skip(skipValue)
                .limit(limit);
            if (courses) {
                return {
                    courses,
                    page: validatedPage,
                    totalPages,
                };
            }
            else {
                return null;
            }
        }
        catch (error) {
            throw error;
        }
    }
    async updateById(id) {
        try {
            let update = await courseModel_1.default.findOneAndUpdate({ _id: id }, {
                publish: true,
            });
            if (update) {
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
    async courseAction(id) {
        try {
            let update = await courseModel_1.default.findOneAndUpdate({ _id: id }, {
                approved: true,
            });
            if (update) {
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
    async courseList(id) {
        let course = await courseModel_1.default.findById(id);
        if (course) {
            let response = await courseModel_1.default.findOneAndUpdate({ _id: id }, {
                listed: !course.listed,
            });
            if (response?.listed) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            throw new Error("failed to fetch");
        }
    }
    async fetchSpecificCourse(id) {
        try {
            let specificCourse = await courseModel_1.default
                .findOne({ _id: id })
                .populate("category")
                .populate("instructor")
                .populate("questions");
            if (specificCourse) {
                return specificCourse;
            }
            else {
                return null;
            }
        }
        catch (error) {
            throw error;
        }
    }
    async updateCourse(courseId, course) {
        try {
            const image = await courseModel_1.default.findById(course._id);
            const updated = await courseModel_1.default.findOneAndUpdate({ _id: courseId }, {
                name: course.name,
                price: course.price,
                category: course.category,
                description: course.description,
                image: course.image ? course.image : image?.image
            }, { new: true });
            if (updated) {
                return true;
            }
            else {
                return true;
            }
        }
        catch (error) {
            throw error;
        }
    }
}
exports.default = CourseRepo;
