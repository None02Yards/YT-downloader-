import express from "express";
import downloadRoutes from "./routes/download.routes.js";
import analyzeRoutes from "./routes/analyze.routes.js";
import { configureFFmpeg } from "./config/ffmpeg.js";

export const createApp = () => {
  configureFFmpeg();

  const app = express();
  app.use(express.json());

  // existing
  app.use("/download", downloadRoutes);

  // ✅ ADD THIS
  app.use("/analyze", analyzeRoutes);

  return app;
};
