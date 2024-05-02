import { Request, Response, NextFunction } from "express";
import Jwt from "../utils/Jwt";
import StudentRepo from "../repository/studentRepo";
let jwt = new Jwt();

let student = new StudentRepo();
export const studentAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {
    let token = req.cookies.studentToken;



    if (!token) {
      res.status(401).json({ status: false, message: "no token found!!!" });
    } else {
      let decodeToken = jwt.verifyToken(token);
    
      

      if (decodeToken) {
        if (decodeToken.role !== "student") {
          return { status: false, message: "No access" };
        }
        let studentData = await student.getStudentById(decodeToken.id)
        
        

        if (studentData && studentData?.is_blocked) {
          
          
          res.status(401).json({ blocked: true });
        } else {
          
          next();
        }
      }
    }
  } catch (error) {
    throw error;
  }
};

export default studentAuth;
