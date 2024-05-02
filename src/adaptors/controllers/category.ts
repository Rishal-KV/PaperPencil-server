import CategoryUseCase from "../../useCase/categoryUseCase";

import { Request, Response } from "express";

class CategoryController {
  private category: CategoryUseCase;
  constructor(category: CategoryUseCase) {
    this.category = category;
  }

  async addCategory(req: Request, res: Response) {
    try {
      let { category } = req.body;

      let response = await this.category.addCategory(category);
      if (response?.status) {
        return res.status(200).json(response);
      } else {
        return res.status(401).json(response);
      }
    } catch (error) {
      console.log(error);
    }
  }
  async fetchCategory(req: Request, res: Response) {
    try {
      let category = await this.category.fetchCategory();
      console.log(category);

      if (category) {
        res.status(200).json(category);
      } else {
        res.status(401).json(category);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async actionCategory(req: Request, res: Response) {
    try {
      let { id } = req.body;
      let actionResponse = await this.category.actionCategory(id);
      if (actionResponse) {
        res.status(200).json(actionResponse);
      } else {
        res.status(200).json(actionResponse);
      }
    } catch (error) {
      console.log(error);
    }
  }
  async updateCategory(req: Request, res: Response) {
    try {
      const { id, name } = req.body;

      const response = await this.category.editCategory(id, name);
      if (response?.status) {
        res.status(200).json(response);
      } else {
        res.status(401).json(response);
      }
    } catch (error) {
      console.log(error);
    }
  }
  async getSpecificCategory(req: Request, res: Response) {
    try {
      const id = req.query.id as string;
      const response = await this.category.getSpecific_category(id);
      if (response?.status) {
        res.status(200).json(response);
      } else {
        res.status(401).json(response);
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export default CategoryController;
