import type {ContactFormData, ContactValidationErrors} from '../types/coach';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const VALID_TOPICS = new Set<ContactFormData['topic']>([
  'general',
  'ideation',
  'innovation',
  'partnership',
]);

export function sanitizeText(value: unknown): string {
  if (typeof value !== 'string') {
    return '';
  }
  return value.trim().replace(/\s+/g, ' ');
}

export function validateContactForm(input: ContactFormData): {
  isValid: boolean;
  errors: ContactValidationErrors;
  sanitized: ContactFormData;
} {
  const name = sanitizeText(input.name);
  const email = sanitizeText(input.email).toLowerCase();
  const message = typeof input.message === 'string' ? input.message.trim() : '';
  const topic = VALID_TOPICS.has(input.topic) ? input.topic : 'general';

  const errors: ContactValidationErrors = {};

  if (!name) {
    errors.name = 'Please enter your name.';
  } else if (name.length < 2) {
    errors.name = 'Name must be at least 2 characters.';
  } else if (name.length > 80) {
    errors.name = 'Name must be 80 characters or fewer.';
  }

  if (!email) {
    errors.email = 'Please enter your email address.';
  } else if (email.length > 160 || !EMAIL_PATTERN.test(email)) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!message) {
    errors.message = 'Please enter a message.';
  } else if (message.length < 10) {
    errors.message = 'Message must be at least 10 characters.';
  } else if (message.length > 1000) {
    errors.message = 'Message must be 1,000 characters or fewer.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    sanitized: {
      name,
      email,
      topic,
      message,
    },
  };
}
