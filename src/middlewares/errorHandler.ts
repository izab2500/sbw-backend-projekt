import { AppError } from "../utils/AppError.js";
import type { Response, Request, NextFunction } from "express";

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