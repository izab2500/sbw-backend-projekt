import { Router } from "express";
import * as menuControllers from "./menu.controller.js";
import { authMiddleware } from "../../middlewares/authMiddleware.js";

const menuItemRouter = Router();

menuItemRouter.get("/", menuControllers.getAllMenuItems);
menuItemRouter.get("/:id", menuControllers.getMenuItemById);
menuItemRouter.post("/", authMiddleware, menuControllers.createMenuItem);
menuItemRouter.put("/:id", authMiddleware, menuControllers.updateMenuItem);
menuItemRouter.delete("/:id", authMiddleware, menuControllers.deleteMenuItem);

export default menuItemRouter;
