import Category from "../../domain/categroy";
import ICategory from "../../useCase/interface/ICategory";
import categoryModel from "../database/categoryModel";

class CategoryRepo implements ICategory {
  async saveCategory(name: string): Promise<Category | null> {
    try {
      let saveCategory = await categoryModel.create({
        name: name,
      });

      return saveCategory;
    } catch (error) {
      throw error;
    }
  }
  async fetchCategory(): Promise<Category[] | null> {
    try {
      let category = categoryModel.find();
      return category;
    } catch (error) {
      throw error;
    }
  }

  async findCategory(name: string): Promise<Category | null> {
    try {
      const categoryFound = await categoryModel.findOne({
        name: { $regex: `^${name}$`, $options: "i" },
      });

      if (categoryFound) {
        return categoryFound;
      } else {
        return null;
      }
    } catch (error) {
      throw error;
    }
  }
  async actionCategory(id: string): Promise<boolean> {
    try {
      let blocked = await categoryModel.findOne({ _id: id });
      if (blocked?.is_blocked) {
        await categoryModel.findOneAndUpdate(
          { _id: id },
          {
            is_blocked: false,
          }
        );

        return false;
      } else {
        await categoryModel.findOneAndUpdate(
          { _id: id },
          {
            is_blocked: true,
          }
        );
        return true;
      }
    } catch (error) {
      throw error;
    }
  }
  async updateCategory(
    catId: string,
    cat: string
  ): Promise<boolean | Category> {
    try {
      const updated = await categoryModel.findOneAndUpdate(
        { _id: catId },
        {
          name: cat,
        },
        { new: true }
      );
      if (updated) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw error;
    }
  }
  async getSpecific_category(id: string): Promise<Category | null> {
    try {
      const category = await categoryModel.findOne({ _id: id });
      if (category) {
        return category;
      } else {
        return null;
      }
    } catch (error) {
      throw error;
    }
  }
}

export default CategoryRepo;
