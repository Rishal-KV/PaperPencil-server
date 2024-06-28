import { Request, Response } from "express";
import AdminUseCase from "../../useCase/adminUseCase";
class adminController {
  private adminUseCase: AdminUseCase;
  constructor(adminUseCase: AdminUseCase) {
    this.adminUseCase = adminUseCase;
  }
  async adminLogin(req: Request, res: Response) {
    try {
      const data = req.body;
      console.log(data);

      let foundAdmin = await this.adminUseCase.adminSignIn(data);
      if (foundAdmin?.status) {
        res.status(200).json(foundAdmin);
      } else if (!foundAdmin?.status) {
        res
          .status(401)
          .json({ status: foundAdmin?.status, message: "invalid password" });
      } else {
        res.json(404).json({ noAdminFound: foundAdmin.adminFound });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getInstructorData(req: Request, res: Response) {
    try {
      const page =
        (req.query.page as string) == "0" ? 1 : (req.query.page as string);
      let userData = await this.adminUseCase.getInstructorData(page as string);
      if (userData) {
        res.status(200).json(userData);
      } else {
        res.status(401).json({ message: "undable to fetch" });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getStudentData(req: Request, res: Response) {
    try {
      const page =
        (req.query.page as string) == "0" ? 1 : (req.query.page as string);
      let studentData = await this.adminUseCase.getStudentData(page as string);
      if (studentData) {
        res.status(200).json(studentData);
      } else {
        res.status(401).json({ message: "undable to fetch" });
      }
    } catch (error) {}
  }

  async instructorAction(req: Request, res: Response) {
    try {
      let { id } = req.body;
      console.log(id);

      let actionstatus = await this.adminUseCase.blockInstructor(id);
      console.log(actionstatus);

      if (actionstatus) {
        res.status(200).json({ status: actionstatus });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async studentAction(req: Request, res: Response) {
    try {
      let { id } = req.body;
      console.log(id);

      let actionStatus = await this.adminUseCase.blockStudent(id);
      console.log(actionStatus);

      if (actionStatus) {
        res.status(200).json({ success: actionStatus });
      }
    } catch (error) {
      console.log(error);
    }
  }
  async fetchCourse(req: Request, res: Response) {
    try {
      const page =
        (req.query.page as string) == "0" ? 1 : (req.query.page as string);

      let courses = await this.adminUseCase.fetchCourse(page as string);

      res.status(200).json(courses);
    } catch (error) {
      console.log(error);
    }
  }

  async fetchProfit(req: Request, res: Response) {
    try {
      const response = await this.adminUseCase.fetchProfit();
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
    }
  }
}

export default adminController;
