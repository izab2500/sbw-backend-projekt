import dotenv from "dotenv";
dotenv.config();
import app from "./app.js";
import connectToMongoDB from "./config/db.js";

const PORT = process.env.PORT || 3000;

/*
  Felhantering på process-nivå
  - registrera och lyssna i node.js process
*/
process.on("unhandledRejection", (reason) => {
  console.error("Unhandled Rejection:", reason);
  process.exit(1);
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  process.exit(1);
});
// Starta server och anslut till databas
async function startServer() {
    try {
        await connectToMongoDB();
        app.listen(PORT, () => {
            console.log(`MongoDB is connected and server is running on port ${PORT} ✅`)
        })
    } catch (err) {
        if (err instanceof Error) {
            console.error(`Database connection failed: ${err.message} 🛑`)
        } else {
            console.error(err);
        }
        process.exit(1);
    }
}

startServer();