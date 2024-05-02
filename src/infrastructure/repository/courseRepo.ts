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

  async fetchCourse(search: string): Promise<Course[] | null> {
    try {
      let courses;
      const blockedCategories = await categoryModel.find(
        { is_blocked: true },
        { _id: 1 }
      );

      const blockedCategoryIds = blockedCategories.map(
        (category) => category._id
      );

      if (search !== undefined) {
        courses = await courseModel
          .find({
            approved: true,
            listed: true,
            name: { $regex: new RegExp(search, "i") },
            category: { $nin: blockedCategoryIds },
          })
          .populate("instructor");
      } else {
        courses = await courseModel
          .find({ approved: true, listed: true })
          .populate("instructor");
      }

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
      console.log(update);

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
}

export default CourseRepo;
