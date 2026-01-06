interface Props {
  value: number;
}

export default function ProgressBar({ value }: Props) {
  return <progress max={100} value={value} />;
}
