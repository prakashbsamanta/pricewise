import mongoose from "mongoose";
import * as logger from "./logger";

// Variable to track the connection status.
let isConnected = false;

export async function connectToDB() {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_URI)
    return logger.logError("MONGODB_URI is not defined");

  if (isConnected)
    return logger.logInfo("=> Using existing database connection");

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    isConnected = true;
    logger.logSuccess("=> Mongo DB connected...");
  } catch (error) {
    throw new Error(`Error while connecting: ${error}`);
  }
}
