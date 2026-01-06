// import ffmpeg from "fluent-ffmpeg";
// import { updateSpinner, succeedSpinner, failSpinner } from "../utils/spinner.js";

// export const mergeStreams = ({ videoStream, audioStream, output }) =>
//   new Promise((resolve, reject) => {
//     ffmpeg()
//       .input(videoStream)
//       .input(audioStream)
//       .outputOptions([
//         "-map 0:v:0",
//         "-map 1:a:0",
//         "-c:v copy",
//         "-c:a copy"
//       ])
//       .on("progress", p => {
//         if (p.percent)
//           updateSpinner(`Merging ${p.percent.toFixed(1)}%`);
//       })
//       .on("end", () => {
//         succeedSpinner("Download complete");
//         resolve();
//       })
//       .on("error", err => {
//         failSpinner(err.message);
//         reject(err);
//       })
//       .save(output);
//   });


import ffmpeg from "fluent-ffmpeg";

export const mergeStreams = ({
  videoStream,
  audioStream,
  output,
  onProgress
}) =>
  new Promise((resolve, reject) => {
    ffmpeg()
      .input(videoStream)
      .input(audioStream)
      .outputOptions([
        "-map 0:v:0",
        "-map 1:a:0",
        "-c:v copy",
        "-c:a copy"
      ])
      .on("progress", p => {
        if (p.percent && onProgress)
          onProgress(Math.floor(p.percent));
      })
      .on("end", resolve)
      .on("error", reject)
      .save(output);
  });
