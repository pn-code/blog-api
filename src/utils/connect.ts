import mongoose from "mongoose";
import config from "config";
import logger from "./logger";

export default async function connect() {
    const dbUri = config.get<string>("dbUri");

    try {
        await mongoose.connect(dbUri);
        logger.info("Connected to DB");
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}
