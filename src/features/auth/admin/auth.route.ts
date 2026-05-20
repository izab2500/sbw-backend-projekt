import { Router } from "express";
import * as authControllers from "./auth.controller.js";
import { authMiddleware } from "../../../middlewares/authMiddleware.js";

const authRouter = Router();

authRouter.post("/login", authControllers.loginAdmin);
authRouter.post("/logout", authMiddleware, authControllers.logoutAdmin);
authRouter.get("/me", authMiddleware, authControllers.getAdmin);

export default authRouter;

