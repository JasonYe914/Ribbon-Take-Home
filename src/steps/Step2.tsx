import { useState } from 'react';
import React from 'react';
import Error from '../accessory/Error';
import { validateStep2, type FormErrors } from '../utils/validation';

const PAYMENT_TYPES = [
  { id: 'visa' as const, label: 'Visa' },
  { id: 'debit' as const, label: 'Debit' },
  { id: 'google' as const, label: 'Google Pay' },
  { id: 'apple' as const, label: 'Apple Pay' },
];

const PRICE = 50;

interface Step2Props {
  paymentType: 'visa' | 'debit' | 'google' | 'apple';
  setPaymentType: (val: 'visa' | 'debit' | 'google' | 'apple') => void;
  cardNumber: string;
  setCardNumber: (val: string) => void;
  expiry: string;
  setExpiry: (val: string) => void;
  cvv: string;
  setCvv: (val: string) => void;
  paymentConfirmed: boolean;
  setPaymentConfirmed: (val: boolean) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function Step2Payment({
  paymentType,
  setPaymentType,
  cardNumber,
  setCardNumber,
  expiry,
  setExpiry,
  cvv,
  setCvv,
  paymentConfirmed,
  setPaymentConfirmed,
  onNext,
  onBack,
}: Step2Props) {
  const [errors, setErrors] = useState<FormErrors>({});

  // Card fields are only shown for visa/debit, not wallet payments
  const showCardFields = (paymentType === 'visa' || paymentType === 'debit') && !paymentConfirmed;
  const showWalletPrompt = (paymentType === 'google' || paymentType === 'apple') && !paymentConfirmed;

  const clearError = (field: string) => {
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  // Auto-format card number as groups of 4 digits separated by spaces
  const handleCardNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, '').slice(0, 16);
    const formatted = digits.replace(/(.{4})/g, '$1 ').trim();
    setCardNumber(formatted);
    clearError('cardNumber');
  };

  // Auto-insert slash after 2 digits for MM/YY format
  const handleExpiry = (e: React.ChangeEvent<HTMLInputElement>) => {
    let raw = e.target.value.replace(/\D/g, '');
    if (raw.length > 2) {
      raw = raw.slice(0, 2) + '/' + raw.slice(2, 4);
    }
    setExpiry(raw);
    clearError('expiry');
  };

  // CVV is digits only, 3–4 chars
  const handleCvv = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 4);
    setCvv(val);
    clearError('cvv');
  };

  const handleConfirmPayment = () => {
    const errs = validateStep2(paymentType, cardNumber, expiry, cvv, paymentConfirmed);

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setErrors({});
    setPaymentConfirmed(true);
  };

  return (
    <div className="card">
      <div className="card-title">Payment method</div>
      <div className="card-sub">
        Secure, one-time fee for your Canadian business registration.
      </div>

      {paymentConfirmed && (
        <div className="paid-tag">
          <span>✓</span> Payment confirmed — ${PRICE}.00 CAD
        </div>
      )}

      <div className="pay-layout">
        {/* LEFT: Payment form */}
        <div>
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', marginBottom: '8px' }}>Payment type</label>
            <div className="pay-types">
              {PAYMENT_TYPES.map(({ id, label }) => (
                <button
                  key={id}
                  type="button"
                  className={`pt ${paymentType === id ? 'sel' : ''}`}
                  onClick={() => {
                    setPaymentType(id);
                    clearError('paymentType');
                  }}
                  disabled={paymentConfirmed}
                >
                  {label}
                </button>
              ))}
            </div>
            {errors.paymentType && <Error text={errors.paymentType} />}
          </div>

          {showCardFields && (
            <div className="card-fields">
              <div className="fg">
                <label htmlFor="cardNumber">Card number</label>
                <input
                  id="cardNumber"
                  type="text"
                  inputMode="numeric"
                  placeholder="1234  5678  9012  3456"
                  value={cardNumber}
                  onChange={handleCardNumber}
                  className={errors.cardNumber ? 'ef' : ''}
                  maxLength={19}
                  autoComplete="cc-number"
                />
                {errors.cardNumber && <Error text={errors.cardNumber} />}
              </div>

              <div className="frow" style={{ marginTop: '12px', marginBottom: 0 }}>
                <div className="fg">
                  <label htmlFor="expiry">Expiry date</label>
                  <input
                    id="expiry"
                    type="text"
                    inputMode="numeric"
                    placeholder="MM/YY"
                    value={expiry}
                    onChange={handleExpiry}
                    className={errors.expiry ? 'ef' : ''}
                    maxLength={5}
                    autoComplete="cc-exp"
                  />
                  {errors.expiry && <Error text={errors.expiry} />}
                </div>

                <div className="fg">
                  <label htmlFor="cvv">CVV</label>
                  <input
                    id="cvv"
                    type="text"
                    inputMode="numeric"
                    placeholder="123"
                    value={cvv}
                    onChange={handleCvv}
                    className={errors.cvv ? 'ef' : ''}
                    maxLength={4}
                    autoComplete="cc-csc"
                  />
                  {errors.cvv && <Error text={errors.cvv} />}
                </div>
              </div>
            </div>
          )}

          {showWalletPrompt && (
            <div className="wallet-prompt">
              Tap "Confirm Payment" to authorize with{' '}
              {paymentType === 'google' ? 'Google' : 'Apple'} Pay
            </div>
          )}

          {paymentConfirmed && (
            <div className="payment-confirmed-note">
              Payment confirmed. Proceed to review your registration.
            </div>
          )}
        </div>

        {/* RIGHT: Order receipt */}
        <div className="order-box">
          <div className="order-head">Your order</div>
          <div className="orow">
            <span>Business registration</span>
            <span>${PRICE}.00</span>
          </div>
          <div className="orow">
            <span>Government fee</span>
            <span>Included</span>
          </div>
          <div className="orow">
            <span>HST</span>
            <span>Included</span>
          </div>
          <div className="ototal">
            <span>Total (CAD)</span>
            <span>${PRICE}.00</span>
          </div>
          <div className="order-note">One-time fee. No recurring charges.</div>
        </div>
      </div>

      <div className="btn-row">
        <button className="btn-s" onClick={onBack}>
          ← Back
        </button>

        {!paymentConfirmed ? (
          <button className="btn-p" onClick={handleConfirmPayment}>
            Confirm Payment
          </button>
        ) : (
          <button className="btn-p" onClick={onNext}>
            Continue to Review →
          </button>
        )}
      </div>
    </div>
  );
}
