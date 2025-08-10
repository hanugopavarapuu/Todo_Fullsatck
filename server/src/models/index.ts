import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const DBconnect = async () => {
    try {

        await mongoose.connect(process.env.MONGO_URI as string);
        console.log("DB connected")
    } catch (e) {
        console.log("not connected to DB");
        process.exit(1);
    }
}

