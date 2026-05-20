import type { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError.js";

/**
 * 
 * Middleware för hantering av okända rutter (404)
 */
export function notFound(
  req: Request,
  res: Response,
  next: NextFunction
) {
  next(
    new AppError(
      "Route not found",
      404,
      "NOT_FOUND"
    )
  );
}