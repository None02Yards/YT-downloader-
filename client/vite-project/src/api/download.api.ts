export type DownloadFormat = "video" | "mp3";

export interface StartDownloadResponse {
  jobId: string;
}

export async function startDownload(
  url: string,
  format: DownloadFormat
): Promise<StartDownloadResponse> {
  const res = await fetch("/download", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url, format })
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(err || "Failed to start download");
  }

  return res.json();
}
