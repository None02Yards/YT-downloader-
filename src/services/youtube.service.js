import ytdl from "ytdl-core";
import { pickBestVideo, pickBestAudio } from "../utils/streamPicker.js";

export const getStreams = async (url) => {
  const info = await ytdl.getInfo(url);

  const video = pickBestVideo(info.formats);
  const audio = pickBestAudio(info.formats);

  if (!video || !audio)
    throw new Error("No suitable streams found");

  return {
    videoStream: ytdl(url, { format: video }),
    audioStream: ytdl(url, { format: audio }),
    quality: video.qualityLabel
  };
};
