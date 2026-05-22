import { AppError } from "../../utils/AppError.js";
import Order from "./orders.model.js";
import MenuItem from "../menu/menu.model.js";
import type { ICreateOrder } from "../../types/order.types.js";

/**
 * 
 * Hämntar alla beställningar från databsen
 */

export async function getAllOrders() {
    return await Order.find()
}

/**
 * 
 * Hämntar en befintlig beställning från databasen
 */

export async function getOrderById(id: string) {
    const orderId = id;
    if (!orderId) {
        throw new AppError("No order id was provided", 400, "BAD_REQUEST");
    }
    const order = await Order.findById(orderId);
    if (!order) {
        throw new AppError("Order not found", 404, "NOT_FOUND");
    }
    return order
}

/**
 * 
 * Skapar en beställning och sparar i databasen.
 */

export async function createOrder(order: ICreateOrder) {
    // Ta emot beställning
    const { customerName, phoneNumber, items } = order;
    // Validera data 
    if (!customerName) {
        throw new AppError("Customer name not provided", 400, "BAD_REQUEST");
    }
    if (!phoneNumber) {
        throw new AppError("Phone number not provided", 400, "BAD_REQUEST");
    }
    if (!Array.isArray(items) || items.length === 0) {
        throw new AppError("Menu items not provided", 400, "BAD_REQUEST");
    }
    // Extrahera menuItemsId
    const menuItemIds = items.map(obj => obj.menuItemId);

    // Hämta produkter
    const menuItems = await MenuItem.find({ _id: { $in: menuItemIds } });

    // Kontrollera att alla produkter finns
    if (menuItems.length !== items.length) {
        throw new AppError("Menu items not found", 404, "NOT_FOUND");
    }
    // Bygg order
    const orderItems = items.map(item => {
        const product = menuItems.find(p => {
            return p.id.toString() === item.menuItemId
        })
        if (!product) {
            throw new AppError("Menu item not found", 404, "NOT_FOUND");
        }
        return {
            menuItemId: product.id.toString(),
            heading: product.heading,
            image: product.image,
            price: product.price,
            quantity: item.quantity
        }
    })

    // Räkna ut totalpris
    const totalPrice = orderItems.reduce((acc, item) => {
        return acc + item.quantity * item.price
    }, 0)

    // Skapa beställning
    const newOrder = {
        customerName,
        phoneNumber,
        items: orderItems,
        totalPrice
    }
    const createdOrder = await Order.create(newOrder)

    // Returnera beställning
    return createdOrder;
}

/**
 * 
 * Uppdaterar en befintlig beställnings status.
 */

export async function updateOrderById(
    id: string,
    status: "pending" | "paid" | "completed" | "cancelled"
) {
    const orderId = id;
    if (!orderId) {
        throw new AppError("No order id was provided", 400, "BAD_REQUEST");
    }
    
    if (status !=="pending" && status !=="paid" && status !=="completed" && status !=="cancelled" ) {
        throw new AppError("No status was provided", 400, "BAD_REQUEST");
    }
    const updatedOrder = await Order.findByIdAndUpdate(
        orderId,
        { status },
        { new: true }
    );

    if (!updatedOrder) {
        throw new AppError("Order not found", 404, "NOT_FOUND");
    }

    return updatedOrder;
}

/**
 * 
 * Raderar en befintlig beställning.
 */

export async function deleteOrderById(id: string) {
    const orderId = id;
    if (!orderId) {
        throw new AppError("No order id was provided", 400, "BAD_REQUEST");
    }

    const deletedOrder = await Order.findByIdAndDelete(orderId);

    if (!deletedOrder) {
        throw new AppError("Order not found", 404, "NOT_FOUND");
    }

    return deletedOrder;

}

