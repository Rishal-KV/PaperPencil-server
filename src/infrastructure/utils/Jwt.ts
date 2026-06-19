import { sign, verify, JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, "../../.env") });
class Jwt {
  private secretKey: string;

  constructor() {
    // console.log('Initializing Jwt class...');
    // console.log('process.env.jwt_secret:', process.env);
    this.secretKey = process.env.jwt_secret || "";
    // console.log('this.secretKey:', this.secretKey);
  }

  createToken(id: string | undefined, role: string): string {
    try {
      let payLoad = { id, role };
      // Access token lives for 15 minutes
      const token = sign(payLoad, this.secretKey, { expiresIn: "15m" });
      return token;
    } catch (error) {
      console.error("Error creating access token:", error);
      throw error;
    }
  }

  createRefreshToken(id: string | undefined, role: string): string {
    try {
      let payLoad = { id, role };
      // Refresh token lives for 7 days
      const token = sign(payLoad, this.secretKey, { expiresIn: "7d" });
      return token;
    } catch (error) {
      console.error("Error creating refresh token:", error);
      throw error;
    }
  }

  verifyToken(token: string): JwtPayload | null {
    try {
      const decoded = verify(token, this.secretKey) as JwtPayload;
      return decoded;
    } catch (error) {
      console.error("Error verifying token:", error);
      return null;
    }
  }
}

export default Jwt;
