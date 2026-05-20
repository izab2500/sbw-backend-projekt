import express, { json, urlencoded } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRouter from "./features/auth/admin/auth.route.js";
import { notFound } from "./middlewares/notFound.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();

// Middleware 
app.use(cors({
    origin:"http://localhost:4200",
    credentials:true
}));
app.use(cookieParser());
app.use(json());
app.use(urlencoded({ extended: true }));

// Rutter
app.use("/api/v1/auth/admin", authRouter);

// Not found 404
app.use(notFound);

// Global felhantering
app.use(errorHandler);

export default app;