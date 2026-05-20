import Admin from "./auth.model.js";
import { AppError } from "../../../utils/AppError.js";
import bcrypt from "bcrypt";

/**
 * 
 * 
 * Autentiserar admin genom att kontrollera
 * email och lösenord mot databasen.
 */
export async function loginAdmin(credentials: { email: string, password: string }): Promise<any> {
    const { email, password } = credentials;
    // Validera email och lösenord
    if (!email || !password) {
        throw new AppError("Invalid credentials", 400, "AUTH_ERROR");
    }
    // Kontrollera om admin existerar
    const admin = await Admin.findOne({ email });
    console.log(email, password, admin)
    if (!admin) {
        throw new AppError("Invalid credentials", 401, "AUTH_ERROR");
    }
    // Jämför lösenord
    const isMatch = await bcrypt.compare(password, (admin as any).password);

    if (!isMatch) {
        throw new AppError("Invalid credentials", 401, "AUTH_ERROR");
    }
    return {
        _id: admin._id.toString(),
        email: admin.email
    }
}

/**
 * 
 * 
 * Hämtar den autentiserade admin
 * från databasen med hjälp av admin-id.
 */
export async function getAdmin(id: string): Promise<any> {
    const adminId = id;
    console.log(adminId)
    // Kontrollera om admin id har skickats med
    if (!adminId) {
        throw new AppError("Admin not found", 404, "NOT_FOUND");
    }
    // Kontrollera om admin existerar
    const admin = await Admin.findById(adminId );
    if (!admin) {
        throw new AppError("Admin not found", 404, "NOT_FOUND");
    }

    return {
        _id: admin._id.toString(),
        email: admin.email
    }
}