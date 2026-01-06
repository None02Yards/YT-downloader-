// import { DOWNLOAD_DIR } from "../config/paths.js";

// const outputPath = path.join(
//   DOWNLOAD_DIR,
//   `${job.id}.mkv`
// );

// const jobs = new Map();

// export const createJob = (id) => {
//   jobs.set(id, {
//     status: "queued",
//     progress: 0,
//     error: null
//   });
// };

// export const updateJob = (id, data) => {
//   if (!jobs.has(id)) return;
//   jobs.set(id, { ...jobs.get(id), ...data });
// };

// export const getJob = (id) => jobs.get(id);

// src/store/job.store.js
import path from "path";
import { EventEmitter } from "events";

const jobs = new Map();

export const createJob = (id) => {
  jobs.set(id, {
    status: "queued",
    progress: 0,
    error: null,
    emitter: new EventEmitter()
  });
};

export const updateJob = (id, updates) => {
  const job = jobs.get(id);
  if (!job) return;

  // 🔒 Terminal states protection
  if (job.status === "failed" || job.status === "ready") {
    return;
  }

  Object.assign(job, updates);
  job.emitter.emit("update", job);
};


export const getJob = (id) => jobs.get(id);
