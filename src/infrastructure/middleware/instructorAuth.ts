import { Request, Response, NextFunction } from "express";
import Jwt from "../utils/Jwt";
import InstructorRepo from "../repository/instructorRepo";
let jwt = new Jwt();

let instructor = new InstructorRepo();
export const instructorAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {
    let token = req.cookies.instructorToken;



    if (!token) {
      res.status(401).json({ status: false, message: "no token found!!!" });
    } else {
      let decodeToken = jwt.verifyToken(token);
    
      

      if (decodeToken) {
        if (decodeToken.role !== "instructor") {
          return { status: false, message: "No access" };
        }
        let instructorData = await instructor.findInstructorById(
          decodeToken.id
        );
        

        if (instructor && instructorData?.is_blocked) {
          
          
          res.status(401).json({ blocked: true ,role:decodeToken.role});
        } else {
          
          next();
        }
      }
    }
  } catch (error) {
    throw error;
  }
};

export default instructorAuth;
