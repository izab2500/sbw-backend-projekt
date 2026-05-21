import { Router } from "express";
import * as messageControllers from "./messages.controller.js"
import { authMiddleware } from "../../middlewares/authMiddleware.js";

const messageRouter = Router();

messageRouter.get("/",authMiddleware, messageControllers.getAllMessages);
messageRouter.get("/:id",authMiddleware, messageControllers.getMessageById);
messageRouter.post("/", messageControllers.createMessage);
messageRouter.put("/:id",authMiddleware, messageControllers.updateStatusOnMessageById);
messageRouter.delete("/:id",authMiddleware, messageControllers.deleteMessageById);

export default messageRouter;