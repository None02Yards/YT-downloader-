// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function analyzeVideo(url: string) {
  const res = await fetch("/analyze", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url })
  });

  if (!res.ok) {
    throw new Error("Analyze failed");
  }

  return res.json();
}
