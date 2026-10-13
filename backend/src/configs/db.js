import mongoose from "mongoose";

import { configs } from "./config.js";

export const connectToDB = async () => {
    try {
        await mongoose.connect(configs.MONGO_URI)
        console.log("MongoDb connected sucessfully ✅")
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        throw error;
    }
}
