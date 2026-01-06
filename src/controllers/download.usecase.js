
// import { runYtDlp } from "../services/ytdlp.service.js";
// import { updateJob } from "../store/job.store.js";

// export const handleDownload = async (job) => {
//   try {
//     updateJob(job.id, { status: "downloading", progress: 0 });

//    await runYtDlp({
//   url: job.url,
//   format: job.format,
//   output: job.output,
//   onProgress: (p) => updateJob(job.id, { progress: p })
// });

// updateJob(job.id, {
//   status: "completed",
//   progress: 100,
//   file: path.resolve("downloads", job.output)
// });

//   } catch (err) {
//     updateJob(job.id, {
//       status: "failed",
//       error: err.message
//     });
//   }
// };


import path from "path";
import { runYtDlp } from "../services/ytdlp.service.js";
import { updateJob } from "../store/job.store.js";
import { JobStatus } from "../models/job-status.enum.js";

export const handleDownload = async (job) => {
  try {
    updateJob(job.id, { status: JobStatus.DOWNLOADING, progress: 0 });

    const absolutePath = path.resolve("downloads", job.output);

    await runYtDlp({
      url: job.url,
      format: job.format,
      output: job.output,
      onProgress: (p) =>
        updateJob(job.id, { progress: p })
    });

   updateJob(job.id, {
    status: JobStatus.READY,
    progress: 100,
    file: absolutePath,
    error: null
  });
} catch (err) {
  updateJob(job.id, {
    status: JobStatus.FAILED,
    error: err.message
  });
  }
};
