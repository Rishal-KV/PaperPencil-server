import { Request, Response } from "express";
import Jwt from "../../infrastructure/utils/Jwt";

class AuthController {
  private jwt: Jwt;

  constructor() {
    this.jwt = new Jwt();
  }

  refreshToken = (req: Request, res: Response) => {
    try {
      const token = req.cookies.refreshToken;
      if (!token) {
        return res.status(401).json({ status: false, message: "No refresh token provided" });
      }

      const decoded = this.jwt.verifyToken(token);
      if (!decoded) {
        return res.status(403).json({ status: false, message: "Invalid or expired refresh token" });
      }

      // Generate a new access token (lives for 15 minutes)
      const newAccessToken = this.jwt.createToken(decoded.id, decoded.role);

      return res.status(200).json({ status: true, token: newAccessToken });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: false, message: "Internal server error" });
    }
  };

  logout = (req: Request, res: Response) => {
    try {
      res.clearCookie("refreshToken", {
         httpOnly: true,
         secure: process.env.NODE_ENV === "production",
         sameSite: "strict"
      });
      return res.status(200).json({ status: true, message: "Logged out successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: false, message: "Internal server error" });
    }
  };
}

export default AuthController;
