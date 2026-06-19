import express from "express";
import AuthController from "../../adaptors/controllers/authController";

const router = express.Router();
const authController = new AuthController();

router.post("/refresh-token", authController.refreshToken);
router.post("/logout", authController.logout);

export default router;
