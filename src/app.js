import express from "express";
import downloadRoutes from "./routes/download.routes.js";
import { configureFFmpeg } from "./config/ffmpeg.js";

export const createApp = () => {
  configureFFmpeg();

  const app = express();
  app.use(express.json());

  app.use("/download", downloadRoutes);

  return app;
};
