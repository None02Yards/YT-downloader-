// import { spawn } from "child_process";
// import path from "path";
// import ffmpegPath from "ffmpeg-static";


// export const runYtDlp = ({ url, format, output, onProgress }) => {
//   return new Promise((resolve, reject) => {
//     const outputPath = path.resolve("downloads", output);
// const ffmpegDir = path.dirname(ffmpegPath);

//    const args = [
//   url,
//   "--no-playlist",
//   "--extractor-args", "youtube:player_client=android,web",
//   "--ffmpeg-location", ffmpegDir,   // ⭐ THIS LINE
//   "-o", outputPath,
//   "--newline",
//   "--progress"
// ];

//     if (format === "mp3") {
//       args.push(
//         "-x",
//         "--audio-format", "mp3",
//         "--audio-quality", "0"
//       );
//     } else {
//       args.push(
//         "-f", "bv*+ba/b",
//         "--merge-output-format", "mp4"
//       );
//     }

//     console.log("[yt-dlp] args:", args.join(" "));

//     const proc = spawn("yt-dlp", args, {
//       windowsHide: true,
//       shell: true
//     });

//     let stderrBuffer = "";

//     proc.stdout.on("data", (data) => {
//       const line = data.toString().trim();
//       console.log("[yt-dlp stdout]", line);

//       const match = line.match(/(\d{1,3}\.\d+)%/);
//       if (match && onProgress) {
//         onProgress(Math.floor(Number(match[1])));
//       }
//     });

//     proc.stderr.on("data", (data) => {
//       const msg = data.toString();
//       stderrBuffer += msg;
//       console.error("[yt-dlp stderr]", msg);
//     });

//     proc.on("close", (code) => {
//       console.log("[yt-dlp] exited with code:", code);
//       if (code === 0) resolve();
//       else reject(new Error(stderrBuffer || "yt-dlp failed"));
//     });
//   });
// };


import { spawn } from "child_process";
import path from "path";
import ffmpegPath from "ffmpeg-static";

/**
 * =========================
 * ANALYZE (no download)
 * =========================
 */
export const analyzeVideo = (url) =>
  new Promise((resolve, reject) => {
    const proc = spawn("yt-dlp", ["-J", "--no-playlist", url], {
      windowsHide: true,
      shell: true
    });

    let stdout = "";
    let stderr = "";

    proc.stdout.on("data", (d) => (stdout += d.toString()));
    proc.stderr.on("data", (d) => (stderr += d.toString()));

    proc.on("close", (code) => {
      if (code !== 0) {
        return reject(new Error(stderr || "yt-dlp analyze failed"));
      }

      try {
        const json = JSON.parse(stdout);
        resolve(normalizeFormats(json));
      } catch {
        reject(new Error("invalid yt-dlp json"));
      }
    });
  });

/**
 * =========================
 * DOWNLOAD / CONVERT
 * =========================
 */
export const runYtDlp = ({ url, format, output, onProgress }) =>
  new Promise((resolve, reject) => {
    const outputPath = path.resolve("downloads", output);
    const ffmpegDir = path.dirname(ffmpegPath);

    const args = [
      url,
      "--no-playlist",
      "--extractor-args", "youtube:player_client=android,web",
      "--ffmpeg-location", ffmpegDir,
      "-o", outputPath,
      "--newline",
      "--progress"
    ];

    if (format === "mp3") {
      args.push(
        "-x",
        "--audio-format", "mp3",
        "--audio-quality", "0"
      );
    } else {
      args.push(
        "-f", "bv*+ba/b",
        "--merge-output-format", "mp4"
      );
    }

    console.log("[yt-dlp] args:", args.join(" "));

    const proc = spawn("yt-dlp", args, {
      windowsHide: true,
      shell: true
    });

    let stderrBuffer = "";

    proc.stdout.on("data", (data) => {
      const line = data.toString().trim();
      const match = line.match(/(\d{1,3}\.\d+)%/);
      if (match && onProgress) {
        onProgress(Math.floor(Number(match[1])));
      }
    });

    proc.stderr.on("data", (data) => {
      stderrBuffer += data.toString();
    });

    proc.on("close", (code) => {
      if (code === 0) resolve();
      else reject(new Error(stderrBuffer || "yt-dlp failed"));
    });
  });

/**
 * =========================
 * HELPERS
 * =========================
 */
function normalizeFormats(info) {
  const audio = [];
  const video = [];

  for (const f of info.formats || []) {
    if (f.vcodec === "none" && f.acodec !== "none" && f.abr) {
      audio.push({
        formatId: f.format_id,
        bitrate: Math.round(f.abr),
        codec: f.ext,
        sizeMB: bytesToMB(f.filesize)
      });
    }

    if (f.vcodec !== "none" && f.acodec === "none" && f.height) {
      video.push({
        formatId: f.format_id,
        resolution: `${f.height}p`,
        codec: f.ext,
        sizeMB: bytesToMB(f.filesize)
      });
    }
  }

  return {
    title: info.title,
    thumbnail: info.thumbnail,
    audio: uniqBy(audio, "bitrate").sort((a, b) => b.bitrate - a.bitrate),
    video: uniqBy(video, "resolution").sort(
      (a, b) => parseInt(b.resolution) - parseInt(a.resolution)
    )
  };
}

function bytesToMB(bytes) {
  return bytes ? +(bytes / 1024 / 1024).toFixed(1) : null;
}

function uniqBy(arr, key) {
  return [...new Map(arr.map((i) => [i[key], i])).values()];
}
