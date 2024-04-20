import { Request, Response, NextFunction } from "express";
import Jwt from "../utils/Jwt";
let jwt = new Jwt();
export const adminAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let token = req.cookies.admin;
   
    
    if (!token) {
      res.status(401).json({ status: true, message: "no token found" });
    } else {
      let decodeToken = jwt.verifyToken(token);
      if (decodeToken && decodeToken.role !== "admin") {
        res.json({ status: false, message: "no access" });
      } else {
        next();
      }
    }
  } catch (error) {
    console.log(error);
  }
};
