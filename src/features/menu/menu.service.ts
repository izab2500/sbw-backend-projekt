import { AppError } from "../../utils/AppError.js";
import MenuItem from "./menu.model.js";
import type { IMenuItem } from "../../types/menu.types.js";

/**
 * 
 * Hämtar alla tillgängliga produkter från databasen.
 * 
 */
export async function getAllMenuItems() {
    return (await MenuItem.find({ isAvailable: true }))
}
/**
 * 
 * Hämtar en tillgänglig produkt från databasen.
 */
export async function getMenuItemById(id: string) {
    const menuId = id;
    if (!menuId) {
        throw new AppError("No id was provided", 400, "BAD_REQUEST");
    }
    const menuItem = await MenuItem.findOne({ _id: menuId, isAvailable: true });
    if (!menuItem) {
        throw new AppError("Menu item not found", 404, "NOT_FOUND");
    }
    return menuItem
}
/**
 * 
 * Skapar en ny produkt i databasen.
 */
export async function createMenuItem(product: IMenuItem) {

    if (!product) {
        throw new AppError("No menu item was provided", 400, "BAD_REQUEST");
    }

    return await MenuItem.create(product);
}
/**
 * 
 * Uppdaterar en befintlig produkt i databsen.
 */
export async function updateMenuItem(
    id: string,
    product: IMenuItem
) {
    const menuId = id;
    if (!menuId) {
        throw new AppError("No id was provided", 400, "BAD_REQUEST");
    }

    if (!product) {
        throw new AppError("No menu item was provided", 400, "BAD_REQUEST");
    }

    const menuItem = await MenuItem.findByIdAndUpdate(
        menuId,
        product,
        { new: true }
    );

    if (!menuItem) {
        throw new AppError("Menu item not found", 404, "NOT_FOUND");
    }

    return menuItem;
}
/**
 * 
 * Raderar en befintlig produkt i databasen.
 */
export async function deleteMenuItem(id: string) {
    const menuId = id;
    if (!menuId) {
        throw new AppError("No id was provided", 400, "BAD_REQUEST");
    }

    const menuItem = await MenuItem.findByIdAndDelete(menuId);

    if (!menuItem) {
        throw new AppError("Menu item not found", 404, "NOT_FOUND");
    }

    return menuItem;
}