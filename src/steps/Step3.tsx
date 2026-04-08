const PRICE = 350;

const PAY_LABEL: Record<string, string> = {
  visa: 'Visa',
  debit: 'Debit',
  google: 'Google Pay',
  apple: 'Apple Pay',
};

// Show only the last 4 digits of the card number — full number is never displayed
function maskCard(num: string): string {
  const clean = num.replace(/\s/g, '');
  if (clean.length < 4) return '•••• •••• •••• ????';
  return `•••• •••• •••• ${clean.slice(-4)}`;
}

interface Step3Props {
  businessName: string;
  ownerName: string;
  email: string;
  address: string;
  paymentType: string;
  cardNumber: string;
  onSubmit: () => void;
  onBack: () => void;
}

export default function Step3Review({
  businessName,
  ownerName,
  email,
  address,
  paymentType,
  cardNumber,
  onSubmit,
  onBack,
}: Step3Props) {
  return (
    <div className="card">
      <div className="card-title">Review & submit</div>
      <div className="card-sub">
        Verify everything below before submitting your registration.
      </div>

      <div className="review-scroll">
        <section className="rev-section">
          <div className="rev-head">Business details</div>
          <div className="rev-row">
            <span className="rev-k">Business name</span>
            <span className="rev-v">{businessName || '—'}</span>
          </div>
          <div className="rev-row">
            <span className="rev-k">Owner name</span>
            <span className="rev-v">{ownerName || '—'}</span>
          </div>
          <div className="rev-row">
            <span className="rev-k">Email address</span>
            <span className="rev-v">{email || '—'}</span>
          </div>
          <div className="rev-row">
            <span className="rev-k">Business address</span>
            <span className="rev-v">{address || '—'}</span>
          </div>
        </section>

        <section className="rev-section" style={{ marginTop: '1rem' }}>
          <div className="rev-head">Payment</div>
          <div className="rev-row">
            <span className="rev-k">Payment method</span>
            <span className="rev-v">{PAY_LABEL[paymentType] || paymentType}</span>
          </div>
          {/* Card number is masked — only last 4 digits shown for reference */}
          <div className="rev-row">
            <span className="rev-k">Card number</span>
            <span className="rev-v masked">{maskCard(cardNumber)}</span>
          </div>
          <div className="rev-row">
            <span className="rev-k">Amount charged</span>
            <span className="rev-v">${PRICE}.00 CAD</span>
          </div>
          <div className="rev-row">
            <span className="rev-k">Status</span>
            <span className="rev-v success-text">✓ Confirmed</span>
          </div>
          {/* CVV and full card number are never shown — tracked internally only */}
        </section>
      </div>

      <div className="info-note">
        By submitting, you confirm this information is accurate. Registrations with conflicting
        business names may be rejected by the government registry.
      </div>

      <div className="btn-row">
        <button className="btn-s" onClick={onBack}>
          ← Back
        </button>
        <button className="btn-p" onClick={onSubmit}>
          Submit Registration →
        </button>
      </div>
    </div>
  );
}
