import { useState } from 'react';

const FAQ = [
  {
    q: 'What is a sole proprietorship?',
    a: "A sole proprietorship is the simplest business structure — you and your business are legally the same entity. It's fast, affordable, and ideal for small Canadian businesses.",
  },
  {
    q: 'How long does registration take?',
    a: "Government processing typically takes 1–3 business days after submission. You'll receive an email confirmation with your registration number.",
  },
  {
    q: 'Why was my registration rejected?',
    a: 'Registrations are rejected when your business name conflicts with an existing registered name. Simply choose a unique name and resubmit — your payment is preserved.',
  },
  {
    q: 'Is my payment information secure?',
    a: "Yes. All payment data is encrypted and handled securely. We never store your full card number — only the last 4 digits for reference.",
  },
  {
    q: "What's included in the $50 fee?",
    a: 'The fee covers your business registration, government filing, and registered office address for one year. HST is included.',
  },
];

export default function HelpButton() {
  const [open, setOpen] = useState(false);
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <>
      <button
        className="help-btn"
        onClick={() => setOpen(true)}
        title="Help & FAQ"
        aria-label="Open help panel"
      >
        ?
      </button>

      {open && (
        <div className="help-overlay" onClick={() => setOpen(false)}>
          <div className="help-panel" onClick={(e) => e.stopPropagation()}>
            <div className="help-header">
              <span>Help & FAQ</span>
              <button
                className="help-close"
                onClick={() => setOpen(false)}
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <p className="help-intro">
              Have a question? Find answers below or{' '}
              <a href="mailto:support@ribbonbusiness.ca">contact support</a>.
            </p>

            <div className="faq-list">
              {FAQ.map((item, i) => (
                <div key={i} className="faq-item">
                  <button
                    className={`faq-q ${openIdx === i ? 'open' : ''}`}
                    onClick={() => setOpenIdx(openIdx === i ? null : i)}
                  >
                    <span>{item.q}</span>
                    <span className="faq-arrow">{openIdx === i ? '▲' : '▼'}</span>
                  </button>
                  {openIdx === i && <div className="faq-a">{item.a}</div>}
                </div>
              ))}
            </div>

            <div className="help-footer">
              <span>Still need help? </span>
              <a href="mailto:support@ribbonbusiness.ca">support@ribbonbusiness.ca</a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
