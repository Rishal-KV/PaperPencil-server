import express, { urlencoded } from "express";
import cors from "cors";
import studentRoute from "../routes/studentRoute";
import instructorRouter from "../routes/instructorRoute";
import adminRoute from "../routes/adminRoute";
import cookieParser from "cookie-parser";

export const createServer = () => {
  try {
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());

    app.use(
      cors({
        origin: "https://paper-pencil.vercel.app",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        credentials: true,
      })
    );
    app.use("/student", studentRoute);
    app.use("/instructor", instructorRouter);
    app.use("/admin", adminRoute);

    return app;
  } catch (error) {
    console.log(error);
  }
};
