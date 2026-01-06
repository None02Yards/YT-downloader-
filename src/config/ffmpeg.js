import ffmpeg from "fluent-ffmpeg";
import ffmpegPath from "ffmpeg-static";

export const configureFFmpeg = () => {
  ffmpeg.setFfmpegPath(ffmpegPath);
};
