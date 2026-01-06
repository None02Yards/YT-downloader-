export const pickBestVideo = (formats) =>
  formats
    .filter(f => f.hasVideo && !f.hasAudio && !f.isLive)
    .sort((a, b) =>
      (b.height - a.height) ||
      (b.fps - a.fps) ||
      (b.bitrate - a.bitrate)
    )[0];

export const pickBestAudio = (formats) =>
  formats
    .filter(f => f.hasAudio && !f.hasVideo)
    .sort((a, b) => b.audioBitrate - a.audioBitrate)[0];
