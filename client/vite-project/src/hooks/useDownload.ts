// // E:\MVC-nodeJS\youtube-downloader\client\vite-project\src\hooks\useDownload.ts

// import { useEffect, useRef, useState } from "react";
// import{ startDownload } from "../api/download.api";
// import type { DownloadFormat } from "../api/download.api";

// export interface JobState {
//   status: string;
//   progress: number;
//   file?: string;            
//   error?: string | null;
// }
// export function useDownload() {
//   const [job, setJob] = useState<JobState | null>(null);
//   const [error, setError] = useState<string | null>(null);

//   const sourceRef = useRef<EventSource | null>(null);

//   const start = async (url: string, format: DownloadFormat) => {
//     setError(null);
//     setJob({ status: "starting", progress: 0 });

//     const { jobId } = await startDownload(url, format);

//     const source = new EventSource(`/download/${jobId}/progress`);
//     sourceRef.current = source;

//     source.onmessage = (e) => {
//       const data: JobState = JSON.parse(e.data);
//       setJob(data);

//     if (data.status === "completed" && data.file) {
//   source.close();
//   window.location.href = `/download/${jobId}/file`;
// }


//       if (data.status === "failed") {
//         source.close();
//         setError(data.error ?? "Download failed");
//       }
//     };

//     source.onerror = () => {
//       source.close();
//       setError("Connection lost");
//     };
//   };

//   useEffect(() => {
//     return () => sourceRef.current?.close();
//   }, []);

//   return { job, error, start };
// }


import { useEffect, useRef, useState } from "react";
import { startDownload } from "../api/download.api";
import type { DownloadFormat } from "../api/download.api";

export interface JobState {
  status: "queued" | "fetching" | "downloading" | "processing" | "ready" | "failed";
  progress: number;
  file?: string;
  error?: string | null;
}

export function useDownload() {
  const [job, setJob] = useState<JobState | null>(null);
  const [jobId, setJobId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const sourceRef = useRef<EventSource | null>(null);

  const start = async (url: string, format: DownloadFormat) => {
    setError(null);
    setJob({ status: "queued", progress: 0 });

    const { jobId } = await startDownload(url, format);
    setJobId(jobId);

    const source = new EventSource(`/download/${jobId}/progress`);
    sourceRef.current = source;

    source.onmessage = (e) => {
      const data: JobState = JSON.parse(e.data);
      setJob(data);

      if (data.status === "failed" && job?.status !== "ready") {
  source.close();
  setError(data.error ?? "Download failed");
}

    };

    source.onerror = () => {
      source.close();
      setError("Connection lost");
    };
  };

  useEffect(() => {
    return () => sourceRef.current?.close();
  }, []);

  return { job, jobId, error, start };
}
