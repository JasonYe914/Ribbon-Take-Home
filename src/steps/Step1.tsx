import { useState } from 'react';
import Error from '../accessory/Error';
import { validateStep1, type FormErrors } from '../utils/validation';

//Define the rules of the step (types and function return types of each prop passed in)
interface Step1Props {
  businessName: string;
  setBusinessName: (val: string) => void;
  ownerName: string;
  setOwnerName: (val: string) => void;
  email: string;
  setEmail: (val: string) => void;
  address: string;
  setAddress: (val: string) => void;
  isRejected: boolean;
  onNext: () => void;
}

export default function Step1Business({
  businessName,
  setBusinessName,
  ownerName,
  setOwnerName,
  email,
  setEmail,
  address,
  setAddress,
  isRejected,
  onNext,
}: Step1Props) {
  const [errors, setErrors] = useState<FormErrors>({});

  //Feature that clears field error when user starts typing in the field
  const clearError = (field: string) => {
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  //Handles all the error validation for step 1
  const handleNext = () => {
    const errs = validateStep1(businessName, ownerName, email, address);

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      const firstKey = Object.keys(errs)[0];
      document.getElementById(firstKey)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setErrors({});
    onNext();
  };

  return (
    <>
      {isRejected && (
        <div className="rejection-banner">
          <div className="rej-icon">!</div>
          <div className="rej-text">
            <h4>Registration rejected</h4>
            <p>
              Your business name conflicts with an existing registration. Please update it below —
              your payment and all other details have been preserved.
            </p>
          </div>
        </div>
      )}

      <div className="card">
        <div className="card-title">Business information</div>
        <div className="card-sub">
          All fields are required to register your sole proprietorship in Canada.
        </div>

        <div className="frow">
          <div className={`fg ${isRejected ? 'highlight' : ''}`}>
            <label htmlFor="businessName">Business name</label>
            <input
              id="businessName"
              type="text"
              placeholder="e.g. Maple Leaf Consulting"
              value={businessName}
              onChange={(e) => {
                setBusinessName(e.target.value);
                clearError('businessName');
              }}
              className={errors.businessName ? 'ef' : ''}
              autoComplete="organization"
            />
            {errors.businessName && <Error text={errors.businessName} />}
          </div>

          <div className="fg">
            <label htmlFor="ownerName">Owner full name</label>
            <input
              id="ownerName"
              type="text"
              placeholder="e.g. Sarah Chen"
              value={ownerName}
              onChange={(e) => {
                setOwnerName(e.target.value);
                clearError('ownerName');
              }}
              className={errors.ownerName ? 'ef' : ''}
              autoComplete="name"
            />
            {errors.ownerName && <Error text={errors.ownerName} />}
          </div>
        </div>

        <div className="frow single">
          <div className="fg">
            <label htmlFor="ownerEmail">Owner email address</label>
            <input
              id="ownerEmail"
              type="email"
              placeholder="e.g. sarah@mapleleaf.ca"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                clearError('ownerEmail');
              }}
              className={errors.ownerEmail ? 'ef' : ''}
              autoComplete="email"
            />
            {errors.ownerEmail && <Error text={errors.ownerEmail} />}
          </div>
        </div>

        <div className="frow single">
          <div className="fg">
            <label htmlFor="businessAddress">Business address</label>
            <input
              id="businessAddress"
              type="text"
              placeholder="Street, City, Province, Postal Code"
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
                clearError('businessAddress');
              }}
              className={errors.businessAddress ? 'ef' : ''}
              autoComplete="street-address"
            />
            {errors.businessAddress && <Error text={errors.businessAddress} />}
          </div>
        </div>

        <div className="btn-row">
          <button className="btn-p" onClick={handleNext}>
            {isRejected ? 'Update & Continue →' : 'Continue to Payment →'}
          </button>
        </div>
      </div>
    </>
  );
}
