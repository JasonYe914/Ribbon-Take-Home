interface ErrorProps {
  text: string;
}

export default function Error({ text }: ErrorProps) {
  return <div className="err">{text}</div>;
}
