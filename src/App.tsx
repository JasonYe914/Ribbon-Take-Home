import { useState } from 'react';
import ProgressBar from './accessory/ProgressBar';
import HelpButton from './accessory/HelpButton';
import Step1Business from './steps/Step1';
import Step2Payment from './steps/Step2';
import Step3Review from './steps/Step3';
import Step4Complete from './steps/Step4';
import './App.css';

export default function App() {
  // Step tracking
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Step 1 — business info
  const [businessName, setBusinessName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');

  // Step 2 — payment
  const [paymentType, setPaymentType] = useState<'visa' | 'debit' | 'google' | 'apple'>('visa');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);

  // Rejection flow — first submit triggers rejection, second succeeds
  const [isRejected, setIsRejected] = useState(false);

  const handleSubmitRegistration = () => {
    if (!isRejected) {
      // First submit — simulate government rejection, send user back to fix business name
      setIsRejected(true);
      setStep(1);
    } else {
      // Second submit — success
      setIsRejected(false);
      setStep(4);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-left">
          <span className="logo-text">Ribbon Business</span>
          <div className="header-sep" />
          <span className="header-sub">Business Registration</span>
        </div>
        <HelpButton />
      </header>

      <ProgressBar step={step} />

      {step === 1 && (
        <Step1Business
          businessName={businessName}
          setBusinessName={setBusinessName}
          ownerName={ownerName}
          setOwnerName={setOwnerName}
          email={email}
          setEmail={setEmail}
          address={address}
          setAddress={setAddress}
          isRejected={isRejected}
          onNext={() => setStep(2)}
        />
      )}

      {step === 2 && (
        <Step2Payment
          paymentType={paymentType}
          setPaymentType={setPaymentType}
          cardNumber={cardNumber}
          setCardNumber={setCardNumber}
          expiry={expiry}
          setExpiry={setExpiry}
          cvv={cvv}
          setCvv={setCvv}
          paymentConfirmed={paymentConfirmed}
          setPaymentConfirmed={setPaymentConfirmed}
          onNext={() => setStep(3)}
          onBack={() => setStep(1)}
        />
      )}

      {step === 3 && (
        <Step3Review
          businessName={businessName}
          ownerName={ownerName}
          email={email}
          address={address}
          paymentType={paymentType}
          cardNumber={cardNumber}
          onSubmit={handleSubmitRegistration}
          onBack={() => setStep(2)}
        />
      )}

      {step === 4 && (
        <Step4Complete
          businessName={businessName}
          ownerName={ownerName}
          email={email}
        />
      )}
    </div>
  );
}
