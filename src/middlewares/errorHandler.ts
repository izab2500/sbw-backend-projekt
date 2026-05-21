import { AppError } from "../utils/AppError.js";
import type { Response, Request, NextFunction } from "express";

/**
 * 
 * Globalt middleware för applikationens felhantering 
 * och hanterar samt loggar följande fel:
 * 1. Mongoose validering
 * 2. Programmer/unexpected (unexpected = oväntade fel?)/system
 * 3. Operational
 */
export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction) {
    // Mongoose validering errors
    if (err instanceof Error && err.name === "ValidationError") {
        const validationError = err as any;
        const messages = Object.values(validationError.errors).map((val: any) => val.message);
        return res.status(400).json({
            success: false,
            message: messages[0] || "Mongoose validation error"
        })
    }
    // Unexpected/programmers errors
    if (!(err instanceof AppError)) {
        console.error("Unexpected errors:", err);
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
    // Operational errors
    console.error("Operational errors:", err.stack);
    return res.status(err.statusCode).json({
        success: false,
        errorType: err.type,
        statusCode: err.statusCode,
        message: err.message,
        details: err.details || null
    })
}