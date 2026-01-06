import ProgressBar from "./ProgressBar";

interface Props {
  status: string;
  progress: number;
}

export default function StatusPanel({ status, progress }: Props) {
  return (
    <section>
      <p>{status}</p>
      <ProgressBar value={progress} />
    </section>
  );
}
