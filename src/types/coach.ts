export type CoachSide = 'left' | 'right';

export type ModalSection = 'about' | 'frameworks' | 'contact' | null;

export interface CoachPanelConfig {
  id: string;
  side: CoachSide;
  indexLabel: '01' | '02';
  title: string;
  tagline: string;
  description: string;
  href: string;
  ctaLabel: string;
  iconClass: string;
  kicker: string;
}

export interface FrameworkItem {
  id: string;
  name: string;
  coach: 'Ideation' | 'Innovation';
  phase: string;
  summary: string;
  href: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  topic: 'general' | 'ideation' | 'innovation' | 'partnership';
  message: string;
}

export type ContactValidationErrors = Partial<Record<keyof ContactFormData, string>>;
