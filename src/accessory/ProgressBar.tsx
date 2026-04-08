const STEPS = ['', '', '', ''];

interface ProgressBarProps {
  step: number;
}

export default function ProgressBar({ step }: ProgressBarProps) {
  return (
    <div className="progress-wrap">
      <div className="steps-track">
        {STEPS.map((label, i) => {
          const num = i + 1;
          const isDone = step > num;
          const isActive = step === num;

          return (
            <div className="s-item" key={num}>
              <div
                className={`s-circle ${isDone ? 'done' : isActive ? 'active' : ''}`}
                aria-label={label}
              >
                {isDone ? '✓' : num}
              </div>
              {num < 4 && <div className={`s-line ${isDone ? 'done' : ''}`} />}
            </div>
          );
        })}
      </div>

      <div className="step-labels">
        {STEPS.map((label, i) => {
          const num = i + 1;
          const cls = step === num ? 'active' : step > num ? 'done' : '';
          return (
            <span key={num} className={`slabel ${cls}`}>
              {label}
            </span>
          );
        })}
      </div>
    </div>
  );
}
