import Icourse from "../../useCase/interface/ICourse";
import Course from "../../domain/course";
import courseModel from "../database/courseModel";
import categoryModel from "../database/categoryModel";
class CourseRepo implements Icourse {
  async saveCourseToDataBase(
    course: Course,
    instructor: string
  ): Promise<Boolean> {
    try {
      console.log(course);

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

  async fetchCourseById(id: string): Promise<Course[] | null> {
    try {
      let course = await courseModel.find({ instructor: id });
      if (course) {
        return course;
      } else {
        return null;
      }
    } catch (error) {
      throw error;
    }
  }

  async fetchCourse(
    search?: string,
    category?: string
  ): Promise<Course[] | null> {
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
        // Add search criteria to match either the name or description fields
        const searchQuery = {
          $and: [
            { name: { $regex: new RegExp(search, "i") } },

            { category: category },
          ],
        };
        Object.assign(query, searchQuery);
      }

      // Fetch courses based on the constructed query
      const courses = await courseModel.find(query).populate("instructor");

      return courses;
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
    console.log(id);

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
        .populate("instructor");
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
      const updated = await courseModel.findOneAndUpdate(
        { _id: courseId },
        {
          name: course.name,
          price: course.price,
          category: course.category,
          description: course.description,
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
