import { useMemo } from 'react';

// Generate a random reference number once on mount and never change it
function generateRef(): string {
  return 'RIB-' + Math.floor(100000 + Math.random() * 900000);
}

interface Step4Props {
  businessName: string;
  ownerName: string;
  email: string;
}

export default function Step4Complete({ businessName, ownerName, email }: Step4Props) {
  const refNumber = useMemo(() => generateRef(), []);

  return (
    <div className="card">
      <div className="success-wrap">
        <div className="chk-circle">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ width: 30, height: 30, color: 'white' }}
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <h2 className="s-title">You successfully registered.</h2>

        <p className="s-sub">
          Your sole proprietorship has been submitted to the Government of Canada.
          A confirmation email will be sent to <strong>{email}</strong>.
        </p>

        <div className="ref-pill">{refNumber}</div>
        <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: '1.75rem' }}>
          Save this reference number for your records.
        </p>

        <div className="s-details">
          <span>Business</span>
          <span>{businessName}</span>
          <span>Owner</span>
          <span>{ownerName}</span>
          <span>Type</span>
          <span>Sole proprietor</span>
          <span>Province</span>
          <span>Ontario</span>
        </div>
      </div>
    </div>
  );
}
