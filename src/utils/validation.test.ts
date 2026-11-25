import {describe, expect, it} from 'vitest';
import type {ContactFormData} from '../types/coach';
import {sanitizeText, validateContactForm} from './validation';

describe('sanitizeText', () => {
  it('collapses extra whitespace and handles non-strings', () => {
    expect(sanitizeText('  Maya   Lin  ')).toBe('Maya Lin');
    expect(sanitizeText(null)).toBe('');
    expect(sanitizeText(undefined)).toBe('');
    expect(sanitizeText(42 as unknown)).toBe('');
  });
});

describe('validateContactForm', () => {
  // Blue Pill: Valid submission
  it('accepts valid input and normalizes whitespace and email casing', () => {
    const result = validateContactForm({
      name: '  Maya   Patel  ',
      email: '  MAYA@EXAMPLE.COM ',
      topic: 'innovation',
      message: 'Interested in running a corporate venture design sprint.',
    });

    expect(result.isValid).toBe(true);
    expect(result.errors).toEqual({});
    expect(result.sanitized).toEqual({
      name: 'Maya Patel',
      email: 'maya@example.com',
      topic: 'innovation',
      message: 'Interested in running a corporate venture design sprint.',
    });
  });

  // Red Pill: Adversarial and invalid inputs
  it('rejects empty fields with clear field-level errors', () => {
    const result = validateContactForm({
      name: '   ',
      email: '',
      topic: 'general',
      message: '   ',
    });

    expect(result.isValid).toBe(false);
    expect(result.errors.name).toBeDefined();
    expect(result.errors.email).toBeDefined();
    expect(result.errors.message).toBeDefined();
  });

  it('rejects malformed emails, too-short messages, and out-of-bounds lengths', () => {
    const result = validateContactForm({
      name: 'A',
      email: 'not-an-email@localhost',
      topic: 'unexpected-topic' as ContactFormData['topic'],
      message: 'Too short',
    });

    expect(result.isValid).toBe(false);
    expect(result.errors.name).toContain('at least 2');
    expect(result.errors.email).toContain('valid email');
    expect(result.errors.message).toContain('at least 10');
    expect(result.sanitized.topic).toBe('general');
  });

  it('rejects overly long name and message payloads', () => {
    const result = validateContactForm({
      name: 'X'.repeat(81),
      email: 'user@example.com',
      topic: 'ideation',
      message: 'Y'.repeat(1001),
    });

    expect(result.isValid).toBe(false);
    expect(result.errors.name).toContain('80 characters');
    expect(result.errors.message).toContain('1,000 characters');
  });
});
