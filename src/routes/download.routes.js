// import express from "express";
// import { downloadHandler } from "../controllers/download.controller.js";

// const router = express.Router();

// router.post("/", downloadHandler);

// export default router;


// import express from "express";
// import {
//   downloadHandler,
//   downloadStatusHandler
// } from "../controllers/download.controller.js";

// const router = express.Router();

// router.post("/", downloadHandler);
// router.get("/:id/status", downloadStatusHandler);

// export default router;

import express from "express";
import {
  downloadHandler,
  downloadStatusHandler,
  downloadFileHandler,
  progressStreamHandler
} from "../controllers/download.controller.js";

const router = express.Router();

router.post("/", downloadHandler);
router.get("/:id/status", downloadStatusHandler);
router.get("/:id/progress", progressStreamHandler);
router.get("/:id/file", downloadFileHandler);

export default router;
