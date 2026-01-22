

// import "./App.css";
// import DownloadForm from "./components/DownloadForm";
// // import StatusPanel from "./components/StatusPanel";
// import { useDownload } from "./hooks/useDownload";
// import { analyzeVideo } from "./api/analyze.api";



// export default function App() {
//   const { job, error, jobId } = useDownload();

//   const handleSubmit = async (url: string) => {
//     try {
//       const result = await analyzeVideo(url);
//       console.log("ANALYZE RESULT:", result);
//     } catch (err) {
//       console.error(err);
//     }
//   };
  
//   return (
//     <div>
//       <DownloadForm
//       onSubmit={(url) => handleSubmit(url)}
//       disabled={false}
//     />

//       {job && (
//         <p>
//           {job.status} – {job.progress}%
//         </p>
//       )}

//    {job?.status === "ready" && jobId && (
//   <button
//     onClick={() => {
//       window.location.href = `/download/${jobId}/file`;
//     }}
//   >
//     Download file
//   </button>
// )}

// {job?.status === "failed" && (
//   <p style={{ color: "red" }}>{job.error}</p>
// )}

//       {error && <p style={{ color: "red" }}>{error}</p>}
//     </div>
//   );
// }

// import "./App.css";
// import DownloadForm from "./components/DownloadForm";
// import { analyzeVideo } from "./api/analyze.api";

// export default function App() {
//   const handleSubmit = async (url: string) => {
//     try {
//       const result = await analyzeVideo(url);
//       console.log("ANALYZE RESULT:", result);
//     } catch (err) {
//       console.error("Analyze error:", err);
//     }
//   };

//   return (
//     <div>
//       <DownloadForm
//         onSubmit={(url) => handleSubmit(url)}
//         disabled={false}
//       />
//     </div>
//   );
// }



import "./App.css";
import DownloadForm from "./components/DownloadForm";
import { analyzeVideo } from "./api/analyze.api";

export default function App() {
  const handleSubmit = async (url: string) => {
    try {
      const result = await analyzeVideo(url);
      console.log("ANALYZE RESULT:", result);
    } catch (err) {
      console.error("Analyze error:", err);
    }
  };

  return (
    <div>
      <DownloadForm
        onSubmit={(url) => handleSubmit(url)}
        disabled={false}
      />
    </div>
  );
}
