// import { bootstrap } from "./app.js";
// import { DownloadJob } from "./models/download.model.js";
// import { handleDownload } from "./controllers/download.controller.js";

// bootstrap();

// const url = process.argv[2];
// if (!url) {
//   console.error("Usage: node src/server.js <youtube-url>");
//   process.exit(1);
// }

// const job = new DownloadJob({
//   url,
//   output: "output.mkv"
// });

// handleDownload(job).catch(console.error);



import { createApp } from "./app.js";

const app = createApp();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
