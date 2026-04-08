// Helper predicates used across multiple validators
const isOnlyNumbers = (val: string) => /^\d+$/.test(val.trim());
const isOnlyLettersAndSpaces = (val: string) => /^[a-zA-Z\s'-]+$/.test(val.trim());
const isValidEmail = (val: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());

export interface FormErrors {
  [key: string]: string | undefined;
}

export function validateStep1(
  businessName: string,
  ownerName: string,
  email: string,
  address: string,
): FormErrors {
  const errors: FormErrors = {};

  if (!businessName.trim()) {
    errors.businessName = 'Business name is required';
  } else if (isOnlyNumbers(businessName)) {
    errors.businessName = 'Invalid — business name cannot be numbers only';
  } else if (/[^a-zA-Z0-9\s&'.,()-]/.test(businessName)) {
    errors.businessName = 'Business name contains invalid characters';
  }

  if (!ownerName.trim()) {
    errors.ownerName = 'Owner full name is required';
  } else if (!isOnlyLettersAndSpaces(ownerName)) {
    errors.ownerName = 'Invalid — name must contain letters only (no numbers or special characters)';
  }

  if (!email.trim()) {
    errors.ownerEmail = 'Email address is required';
  } else if (!isValidEmail(email)) {
    errors.ownerEmail = 'Please enter a valid email address (e.g. name@example.com)';
  }

  if (!address.trim()) {
    errors.businessAddress = 'Business address is required';
  } else if (isOnlyNumbers(address)) {
    errors.businessAddress = 'Invalid — address cannot be numbers only';
  }

  return errors;
}

export function validateStep2(
  paymentType: string,
  cardNumber: string,
  expiry: string,
  cvv: string,
  paymentConfirmed: boolean,
): FormErrors {
  const errors: FormErrors = {};

  // If payment is already confirmed, nothing to validate
  if (paymentConfirmed) return errors;

  if (!paymentType) {
    errors.paymentType = 'Please select a payment method';
  }

  // Card fields only apply to visa/debit — not wallet payments
  const requiresCard = paymentType === 'visa' || paymentType === 'debit';

  if (requiresCard) {
    const cleanCard = cardNumber.replace(/[\s-]/g, '');

    if (!cardNumber.trim()) {
      errors.cardNumber = 'Card number is required';
    } else if (!/^\d+$/.test(cleanCard)) {
      errors.cardNumber = 'Card number must contain digits only';
    } else if (cleanCard.length !== 16) {
      errors.cardNumber = 'Card number must be 16 digits';
    }

    if (!expiry.trim()) {
      errors.expiry = 'Expiry date is required';
    } else if (!/^\d{2}\/\d{2}$/.test(expiry)) {
      errors.expiry = 'Use MM/YY format';
    } else {
      const [mm, yy] = expiry.split('/').map(Number);
      const now = new Date();
      const expDate = new Date(2000 + yy, mm - 1);

      if (mm < 1 || mm > 12) {
        errors.expiry = 'Invalid month';
      } else if (expDate < now) {
        errors.expiry = 'This card has expired';
      }
    }

    if (!cvv.trim()) {
      errors.cvv = 'CVV is required';
    } else if (!/^\d{3,4}$/.test(cvv)) {
      errors.cvv = 'CVV must be 3 or 4 digits';
    }
  }

  return errors;
}
