import * as orderService from "./orders.service.js";
import type { Request, Response } from "express"

/**
 * 
 * Ansvarar för att hantera förfrågan och 
 * anropa service för att hämta alla beställningar.
 */

export async function getAllOrders(_req: Request, res: Response): Promise<void> {
    const orders = await orderService.getAllOrders()

    res.status(200).json({
        success: true,
        message: "Orders fetched successfully",
        data: orders
    });
}

/**
 * 
 * Ansvarar för att hantera förfrågan och 
 * anropa service för att hämta en befintlig beställningar.
 */

export async function getOrderById(req: Request, res: Response): Promise<void> {
    const id = req.params.id as string;
    const order = await orderService.getOrderById(id);
    res.status(200).json({
        success: true,
        message: "Order fetched successfully",
        data: order
    });
}

export async function createOrder(req: Request, res: Response): Promise<void> {
    const payload = req.body; //CustomerName, phoneNumber, items:{menuItemId,quantity}[]
    const createdOrder = await orderService.createOrder(payload);
    res.status(201).json({
        success: true,
        message: "Order created successfully",
        data: createdOrder
    });
}

/**
 * 
 * Ansvarar för att hantera förfrågan och 
 * anropa service för att uppdatera en befintlig beställning.
 */
export async function updateOrderById(req: Request, res: Response): Promise<void> {
    const id = req.params.id as string;
    const { status } = req.body
    const updatedOrder = await orderService.updateOrderById(id, status);
    res.status(200).json({
        success: true,
        message: "Order status updated successfully",
        data: updatedOrder
    });
}

/**
 * 
 * Ansvarar för att hantera förfrågan och 
 * anropa service för att radera en befintlig beställning.
 */
export async function deleteOrderById(req: Request, res: Response): Promise<void> {
    const id = req.params.id as string;
    const deletedOrder = await orderService.deleteOrderById(id);
    res.status(200).json({
        success: true,
        message: "Order deleted successfully",
        data: deletedOrder
    });
}