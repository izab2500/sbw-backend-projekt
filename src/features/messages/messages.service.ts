import { AppError } from "../../utils/AppError.js";
import Message from "./messages.model.js";
import type { TMessage } from "../../types/message.types.js"

/**
 * 
 * Hämtar alla meddelanden från databasen.
 * 
 */
export async function getAllMessages() {
    return await Message.find()
}
/**
 * 
 * Hämtar ett meddelande från databasen.
 */
export async function getMessageById(id: string) {
    const messageId = id;
    if (!messageId) {
        throw new AppError("No message id was provided", 400, "BAD_REQUEST");
    }
    const message = await Message.findOne({ _id: messageId });
    if (!message) {
        throw new AppError("Message not found", 404, "NOT_FOUND");
    }
    return message;
}
/**
 * 
 * Skapar ett meddelande i databasen.
 */
export async function createMessage(message: TMessage) {
    if (!message) {
        throw new AppError("No message was provided", 400, "BAD_REQUEST");
    }
    return await Message.create(message);
}
/**
 * 
 * Uppdaterar/toogla lässtatus på ett meddelande.
 * 
 */
export async function updateStatusOnMessageById(id: string) {
    const messageId = id;
    if (!messageId) {
        throw new AppError("No message id was provided", 400, "BAD_REQUEST");
    }

    const message = await Message.findOne({ _id: messageId });
    if (!message) {
        throw new AppError("Message not found", 404, "NOT_FOUND");
    }
    message.isRead = !message.isRead;
    await message.save();

    return message;
}
/**
 * 
 * Raderar ett befintligt meddelande i databasen.
 */
export async function deleteMessageById(id: string) {
    const messageId = id;
    if (!messageId) {
        throw new AppError("No message id was provided", 400, "BAD_REQUEST");
    }

    const message = await Message.findByIdAndDelete(messageId);
    if (!message) {
        throw new AppError("Message not found", 404, "NOT_FOUND");
    }
    return message;
}