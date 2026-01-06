

import "./App.css";
import DownloadForm from "./components/DownloadForm";
// import StatusPanel from "./components/StatusPanel";
import { useDownload } from "./hooks/useDownload";

export default function App() {
  const { job, error, start, jobId } = useDownload();

  return (
    <div>
      <DownloadForm
        onSubmit={start}
        disabled={job?.status === "downloading"}
      />

      {job && (
        <p>
          {job.status} – {job.progress}%
        </p>
      )}

   {job?.status === "ready" && jobId && (
  <button
    onClick={() => {
      window.location.href = `/download/${jobId}/file`;
    }}
  >
    Download file
  </button>
)}

{job?.status === "failed" && (
  <p style={{ color: "red" }}>{job.error}</p>
)}

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
