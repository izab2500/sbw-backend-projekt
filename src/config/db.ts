import mongoose from "mongoose";

/**
 * 
 * Skapar databasanslutning till MongoDB.
 */
async function connectToMongoDB(): Promise<void> {
    const mongoURL = process.env.MONGODB_URL;
    if (!mongoURL) throw new Error("MONGODB_URL is missing in .env");
    await mongoose.connect(mongoURL);
}

export default connectToMongoDB;