// import { useState } from "react";
// import type { DownloadFormat } from "../api/download.api";



// interface Props {
//   onSubmit: (url: string, format: DownloadFormat) => void;
//   disabled: boolean;
// }

// export default function DownloadForm({ onSubmit, disabled }: Props) {
//   const [url, setUrl] = useState("");
//   const [format, setFormat] = useState<DownloadFormat>("video");

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (url) onSubmit(url, format);
//   };
  

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         type="url"
//         placeholder="Paste YouTube link"
//         value={url}
//         onChange={(e) => setUrl(e.target.value)}
//         required
//         disabled={disabled}
//       />

//       <select
//         value={format}
//         onChange={(e) => setFormat(e.target.value as DownloadFormat)}
//         disabled={disabled}
//       >
//         <option value="video">Video (best quality)</option>
//         <option value="mp3">MP3 (audio only)</option>
//       </select>

//       <button type="submit" disabled={disabled}>
//         convert
//       </button>
//     </form>
//   );
// }


import { useState } from "react";

interface Props {
  onSubmit: (url: string) => void;
  disabled: boolean;
}

export default function DownloadForm({ onSubmit, disabled }: Props) {
  const [url, setUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;
    onSubmit(url.trim());
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="url"
        placeholder="Paste YouTube link"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        required
        disabled={disabled}
      />

      <button type="submit" disabled={disabled}>
        Convert
      </button>
    </form>
  );
}
