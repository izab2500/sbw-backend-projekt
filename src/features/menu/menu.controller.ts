import * as menuItemService from "./menu.service.js";
import type { Request, Response } from "express";

/**
 * 
 * Ansvarar för att hantera förfrågan och 
 * anropa service för att hämta alla produkter.
 */
export async function getAllMenuItems(_req: Request, res: Response): Promise<void> {
    const menuItems = await menuItemService.getAllMenuItems()

    res.status(200).json({
        success: true,
        message: "Menu items fetched successfully",
        data: menuItems
    });
}
/**
 * 
 * Ansvarar för att hantera förfrågan och 
 * anropa service för att hämta en produkt.
 */
export async function getMenuItemById(req: Request, res: Response): Promise<void> {
    const id = req.params.id as string;
    const menuItem = await menuItemService.getMenuItemById(id);
    res.status(200).json({
        success: true,
        message: "Menu item fetched successfully",
        data: menuItem
    });
}
/**
 * 
 * Ansvarar för att hantera förfrågan och 
 * anropa service för att skapa en produkt.
 */
export async function createMenuItem(req: Request, res: Response): Promise<void> {
    const payload = req.body;
    const createdMenuItem = await menuItemService.createMenuItem(payload);
    res.status(201).json({
        success: true,
        message: "Menu item created successfully",
        data: createdMenuItem
    });
}
/**
 * 
 * Ansvarar för att hantera förfrågan och 
 * anropa service för att uppdatera en produkt.
 */
export async function updateMenuItem(req: Request, res: Response): Promise<void> {
    const id = req.params.id as string;
    const payload = req.body;
    const updatedMenuItem = await menuItemService.updateMenuItem(id, payload);
    res.status(200).json({
        success: true,
        message: "Menu item updated successfully",
        data: updatedMenuItem
    });
}
/**
 * 
 * Ansvarar för att hantera förfrågan och 
 * anropa service för att radera en produkt.
 */
export async function deleteMenuItem(req: Request, res: Response): Promise<void> {
    const id = req.params.id as string;
    const deletedMenuItem = await menuItemService.deleteMenuItem(id);
    res.status(200).json({
        success: true,
        message: "Menu item deleted successfully",
        data: deletedMenuItem
    });
}