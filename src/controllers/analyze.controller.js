import { analyzeVideo } from "../services/ytdlp.service.js";

export const analyzeHandler = async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: "url is required" });
  }

  try {
    const result = await analyzeVideo(url);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
