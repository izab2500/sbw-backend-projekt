import { Router } from "express";
import * as orderControllers from "./orders.controller.js";
import { authMiddleware } from "../../middlewares/authMiddleware.js";

const orderRouter = Router();

orderRouter.get("/", authMiddleware, orderControllers.getAllOrders);
orderRouter.get("/:id", authMiddleware, orderControllers.getOrderById);
orderRouter.post("/", orderControllers.createOrder);
orderRouter.patch("/:id/status", authMiddleware, orderControllers.updateOrderById);
orderRouter.delete("/:id", authMiddleware, orderControllers.deleteOrderById);

export default orderRouter;