import mongoose from "mongoose";
const { Schema } = mongoose;

/**
 * 
 * Schema och modell för admins autentisiering
 */
const adminSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            "Enter a valid email"]
    },
    password: {
        type: String,
        required:true,
        minlength: [8, "Password must be at least 8 characters long"],
    },
},
    {
        timestamps: true,
    }

);

const Admin = mongoose.model("Admin", adminSchema);
export default Admin;
