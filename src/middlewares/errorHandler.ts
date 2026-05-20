import { AppError } from "../utils/AppError.js";
import type { Response, Request, NextFunction } from "express";

/**
 * 
 * Globalt middleware för applikationens felhantering 
 * och hanterar samt loggar följande fel:
 * 1. System
 * 2. Programmer
 * 3. Operational
 */
export function errorHandler(err: unknown, req: Request, res: Response, _next: NextFunction) {
    // Unexpected/programmers errors
    if (!(err instanceof AppError)) {
        console.error("Unexpected errors:", err);
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
    // Operational errors
    console.error("Operational errors", err.stack);
    return res.status(err.statusCode).json({
        success: false,
        errorType: err.type,
        statusCode: err.statusCode,
        message: err.message,
        details: err.details || null
    })
}