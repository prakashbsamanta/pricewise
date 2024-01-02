import mongoose from "mongoose";
import * as logger from "./logger";

// Variable to track the connection status.
let isConnected = false;

export async function connectToDB() {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_URI)
    return console.log("MONGODB_URI is not defined");

  if (isConnected)
    return logger.logError("=> Using existing database connection");

  try {
    console.log(process.env.MONGODB_URI);
    await mongoose.connect(process.env.MONGODB_URI);
    isConnected = true;
    logger.logSuccess("=> Mongo DB connected...");
  } catch (error) {
    throw new Error(`Error while connecting: ${error}`);
  }
}
