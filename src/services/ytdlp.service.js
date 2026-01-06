import { spawn } from "child_process";
import path from "path";
import ffmpegPath from "ffmpeg-static";


export const runYtDlp = ({ url, format, output, onProgress }) => {
  return new Promise((resolve, reject) => {
    const outputPath = path.resolve("downloads", output);
const ffmpegDir = path.dirname(ffmpegPath);

   const args = [
  url,
  "--no-playlist",
  "--extractor-args", "youtube:player_client=android,web",
  "--ffmpeg-location", ffmpegDir,   // ⭐ THIS LINE
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
      console.log("[yt-dlp stdout]", line);

      const match = line.match(/(\d{1,3}\.\d+)%/);
      if (match && onProgress) {
        onProgress(Math.floor(Number(match[1])));
      }
    });

    proc.stderr.on("data", (data) => {
      const msg = data.toString();
      stderrBuffer += msg;
      console.error("[yt-dlp stderr]", msg);
    });

    proc.on("close", (code) => {
      console.log("[yt-dlp] exited with code:", code);
      if (code === 0) resolve();
      else reject(new Error(stderrBuffer || "yt-dlp failed"));
    });
  });
};
