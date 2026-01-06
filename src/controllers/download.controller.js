
import { randomUUID } from "crypto";
import fs from "fs";
import path from "path";
import { DownloadJob } from "../models/download.model.js";
import { handleDownload } from "./download.usecase.js";
import { createJob, getJob } from "../store/job.store.js";

/**
 * POST /download
 */
export const downloadHandler = async (req, res) => {
  const { url, format } = req.body;

  if (!url)
    return res.status(400).json({ error: "url is required" });

  const id = randomUUID();
  createJob(id);

  const output =
    format === "mp3"
      ? `${id}.mp3`
      : `${id}.mkv`;

  const job = new DownloadJob({
    id,
    url,
    format,
    output
  });

    

 if (typeof handleDownload !== "function") {
  console.error("❌ handleDownload is NOT a function:", handleDownload);
  return;
}

handleDownload(job).catch(err => {
  console.error("❌ handleDownload failed:", err);
});


  res.status(202).json({ jobId: id });
};

/**
 * GET /download/:id/status
 */
export const downloadStatusHandler = (req, res) => {

  const job = getJob(req.params.id);

  if (!job)
    return res.status(404).json({ error: "job not found" });

  res.json(job);
};

/**
 * GET /download/:id/progress  (SSE)
 */
export const progressStreamHandler = (req, res) => {
  const job = getJob(req.params.id);

  if (!job)
    return res.sendStatus(404);

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  const send = (data) => {
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  };

  // send initial state
  send(job);

  job.emitter.on("update", send);

  req.on("close", () => {
    job.emitter.off("update", send);
  });
};

/**
 * GET /download/:id/file
 */
export const downloadFileHandler = (req, res) => {
  const job = getJob(req.params.id);

  if (!job || job.status !== "completed")
    return res.sendStatus(404);

  const filePath = path.resolve(job.file);

  if (!fs.existsSync(filePath))
    return res.sendStatus(404);

  res.download(filePath, path.basename(filePath));
};
