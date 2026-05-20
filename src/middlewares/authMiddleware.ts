import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../utils/AppError.js";

/**
 * 
 * Middleware som verifierar JSON web token för skyddade rutter,
 * innan rutten körs.
 */
export function authMiddleware(req: Request, _res: Response, next: NextFunction) {
    const token = req.cookies.token;

    if (!token) {
        throw new AppError("No token provided", 401, "UNAUTHORIZED");
    }

    const decoded = jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET as string
    );

    (req as any).user = decoded;

    next();
}