import { Request, Response, NextFunction } from "express";
import Jwt from "../utils/Jwt";
import StudentRepo from "../repository/studentRepo";
import InstructorRepo from "../repository/instructorRepo";

let jwt = new Jwt();
let studentRepo = new StudentRepo();
let instructorRepo = new InstructorRepo();

export const roleAuth = (roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      let token = req.headers.authorization;

      if (!token) {
        return res.status(401).json({ status: false, message: "no token found!!!" });
      }

      let decodeToken = jwt.verifyToken(token);

      if (!decodeToken) {
        return res.status(401).json({ status: false, message: "invalid token" });
      }

      if (!roles.includes(decodeToken.role)) {
        return res.status(403).json({ status: false, message: "no access" });
      }

      // Check if the user is blocked
      if (decodeToken.role === "student") {
        let studentData = await studentRepo.getStudentById(decodeToken.id);
        if (studentData && studentData.is_blocked) {
          return res.status(403).json({ blocked: true, role: decodeToken.role });
        }
      } else if (decodeToken.role === "instructor") {
        let instructorData = await instructorRepo.findInstructorById(decodeToken.id);
        if (instructorData && instructorData.is_blocked) {
          return res.status(403).json({ blocked: true, role: decodeToken.role });
        }
      }

      next();
    } catch (error) {
      console.log(error);
      return res.status(500).json({ status: false, message: "Internal server error" });
    }
  };
};

export default roleAuth;
