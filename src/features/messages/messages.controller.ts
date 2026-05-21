import * as messageService from "./messages.service.js";
import type { Request, Response } from "express";

/**
 * 
 * Ansvarar för att hantera förfrågan och 
 * anropa service för att hämta alla meddelanden.
 */
export async function getAllMessages(_req: Request, res: Response): Promise<void> {
    const messages = await messageService.getAllMessages();

    res.status(200).json({
        success: true,
        message: "Messages fetched successfully",
        data: messages
    });
}
/**
 * 
 * Ansvarar för att hantera förfrågan och 
 * anropa service för att hämta ett meddelanden.
 */
export async function getMessageById(req: Request, res: Response): Promise<void> {
    const id = req.params.id as string;
    const message = await messageService.getMessageById(id);
    res.status(200).json({
        success: true,
        message: "Message fetched successfully",
        data: message
    });
}
/**
 * 
 * Ansvarar för att hantera förfrågan och 
 * anropa service för att skapa ett meddelanden.
 */
export async function createMessage(req: Request, res: Response): Promise<void> {
    const payload = req.body;
    const createdMessage = await messageService.createMessage(payload);
    res.status(201).json({
        success: true,
        message: "Message created successfully",
        data: createdMessage
    });
}
/**
 * 
 * Ansvarar för att hantera förfrågan och 
 * anropa service för att uppdatera lässtatus på ett meddelande.
 */
export async function updateStatusOnMessageById(req: Request, res: Response): Promise<void> {
    const id = req.params.id as string;
    const updatedMessageReadStatus = await messageService.updateStatusOnMessageById(id);
    res.status(200).json({
        success: true,
        message: "Message status updated successfully",
        data: updatedMessageReadStatus
    });
}
/**
 * 
 * Ansvarar för att hantera förfrågan och 
 * anropa service för att radera ett meddelande.
 */
export async function deleteMessageById(req: Request, res: Response): Promise<void> {
    const id = req.params.id as string;
    const deletedMessage = await messageService.deleteMessageById(id);
    res.status(200).json({
        success: true,
        message: "Message deleted successfully",
        data: deletedMessage
    });
}