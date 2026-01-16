import app from "./app";
import { env } from "./config/env";
import connectDB from "./config/db";
import mongoose from "mongoose";

const PORT = env.PORT || 3002;

connectDB();
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    uptime: process.uptime(),
    timeStamp: Date.now(),
  });
});

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

async function shutdown() {
  console.log("Shutting Down Gracefully....");
  server.close();
  await mongoose.connection.close();
  process.exit(0);
}
