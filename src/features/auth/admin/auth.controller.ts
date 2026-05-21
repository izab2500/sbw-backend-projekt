import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import * as authServices from "./auth.service.js";

/**
 * 
 * Loggar in admin och skapar JWT token.
 */
export async function loginAdmin(req: Request, res: Response) {
    const { email, password } = req.body;

    // Hämnta admin från service
    const admin = await authServices.loginAdmin({ email, password });

    // Skapa JWT token
    const token = jwt.sign(
        {
            id: admin._id,
            email: admin.email
        },
        process.env.ACCESS_TOKEN_SECRET!,
        { expiresIn: "1h" }
    );

    // Lägg till token i httpOnly cookie
    res.cookie("token", token, {
        httpOnly: true,
        secure: false,  // true för production
        sameSite: "strict",
        maxAge: 60 * 60 * 1000
    });

    return res.status(200).json({
        success: true,
        message: "Login successful"
    });
}

/**
 * 
 * Skyddar admin-gränssnittet genom att kontrollera
 * att JWT-token är giltig och att admin-sessionen är aktiv.
 */

export async function getAdmin(req: Request, res: Response) {
    const adminId = (req as any).user.id
    const admin = await authServices.getAdmin(adminId);
    return res.status(200).json({
        success: true,
        message: "Admin session is active",
        admin
    });
}


/**
 * 
 * Raderar cookie (JWT token...) eller förstör sessionen
 * och loggar ut admin.
 */

export function logoutAdmin(_req: Request, res: Response) {
    res.clearCookie("token", {
        httpOnly: true,
        secure: false,
        sameSite: "strict"
    })
    return res.status(200).json({
        success: true,
        message: "Logged out successfully",
    });
}