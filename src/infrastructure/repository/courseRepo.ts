import Icourse from "../../useCase/interface/ICourse";
import Course from "../../domain/course";
import courseModel from "../database/courseModel";
class CourseRepo implements Icourse {
  async saveCourseToDataBase(
    course: Course,
    instructor: string
  ): Promise<Boolean> {
    try {
      let { name, price, description, image, category } = course;

      let saved = await courseModel.create({
        instructor: instructor,
        name: name,
        price: price,
        description: description,
        category: category,
        image: image,
      });
      if (saved) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw error;
    }
  }

  async fetchCourseById(
    id: string,
    limit: number,
    skip: number,
    page: number
  ): Promise<{ course: Course[]; page: number; totalPage: number } | null> {
   

    try {
      let course = await courseModel
        .find({ instructor: id })
        .limit(limit)
        .skip(skip)
        .sort({ createdAt: -1 });
      const totalCourse = await courseModel.countDocuments({ instructor: id });

      if (course) {
        return {
          course,
          page,
          totalPage: Math.ceil(totalCourse / limit),
        };
      } else {
        return null;
      }
    } catch (error) {
      throw error;
    }
  }

  async fetchCourse(
    search?: string,
    category?: string,
    price?: any,
    limit?: number,
    skip?: number,
    page: number = 1
  ): Promise<{ courses: Course[]; totalPages: number; page: number } | null> {
    try {
      // Construct the base query
      let query: any = {
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
      const sortOptions: any = {};
      if (price !== "") {
        sortOptions.price = price === "desc" ? -1 : 1;
      }

      // Fetch total number of courses matching the query
      const totalCourses = await courseModel.countDocuments(query);

      // Calculate total pages
      const totalPages = Math.ceil(totalCourses / (limit as number));

      // Ensure the page does not exceed total pages
      const validatedPage = Math.min(page, totalPages) || 1;

      // Calculate skip value based on validated page and limit
      const skipValue = (validatedPage - 1) * (limit as number);

      // Fetch courses based on the constructed query
      const courses = await courseModel
        .find(query)
        .sort(sortOptions)
        .populate("instructor")
        .skip(skipValue)
        .limit(limit as number);

      if (courses) {
        return {
          courses,
          page: validatedPage,
          totalPages,
        };
      } else {
        return null;
      }
    } catch (error) {
      throw error;
    }
  }

  async updateById(id: string): Promise<boolean> {
    try {
      let update = await courseModel.findOneAndUpdate(
        { _id: id },
        {
          publish: true,
        }
      );
      if (update) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw error;
    }
  }
  async courseAction(id: string): Promise<boolean> {
    try {
      let update = await courseModel.findOneAndUpdate(
        { _id: id },
        {
          approved: true,
        }
      );

      if (update) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw error;
    }
  }
  async courseList(id: string): Promise<boolean> {
    let course = await courseModel.findById(id);
    if (course) {
      let response = await courseModel.findOneAndUpdate(
        { _id: id },
        {
          listed: !course.listed,
        }
      );
      if (response?.listed) {
        return true;
      } else {
        return false;
      }
    } else {
      throw new Error("failed to fetch");
    }
  }

  async fetchSpecificCourse(id: string): Promise<Course | null> {
    try {
      let specificCourse = await courseModel
        .findOne({ _id: id })
        .populate("category")
        .populate("instructor")
        .populate("questions");
      if (specificCourse) {
        return specificCourse;
      } else {
        return null;
      }
    } catch (error) {
      throw error;
    }
  }
  async updateCourse(courseId: string, course: Course): Promise<boolean> {
    try {
      const image = await courseModel.findById(course._id)
      const updated = await courseModel.findOneAndUpdate(
        { _id: courseId },
        {
          name: course.name,
          price: course.price,
          category: course.category,
          description: course.description,
          image : course.image ? course.image : image?.image
        },
        { new: true }
      );
      if (updated) {
        return true;
      } else {
        return true;
      }
    } catch (error) {
      throw error;
    }
  }
}

export default CourseRepo;
