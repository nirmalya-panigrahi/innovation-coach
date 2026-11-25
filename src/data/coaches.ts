import type {CoachPanelConfig, FrameworkItem} from '../types/coach';

export const COACH_PANELS: Record<'left' | 'right', CoachPanelConfig> = {
  left: {
    id: 'ideation-coach',
    side: 'left',
    indexLabel: '01',
    kicker: 'Divergent Thinking',
    title: 'Ideation Coach',
    tagline: 'Structured brainstorming framework',
    description:
      'Generate, cluster, and pressure-test original product concepts with guided divergent prompts.',
    href: 'https://ideation-coach.vercel.app/',
    ctaLabel: 'Open Ideation Coach',
    iconClass: 'fa-solid fa-lightbulb',
  },
  right: {
    id: 'innovation-coach',
    side: 'right',
    indexLabel: '02',
    kicker: 'Venture Execution',
    title: 'Innovation Coach',
    tagline: 'Corporate venture and design thinking',
    description:
      'Turn validated concepts into viable business models, sprint roadmaps, and executive venture briefs.',
    href: 'https://innovation-coach.vercel.app/',
    ctaLabel: 'Open Innovation Coach',
    iconClass: 'fa-solid fa-rocket',
  },
};

export const FRAMEWORK_DIRECTORY: FrameworkItem[] = [
  {
    id: 'scamper-sprint',
    name: 'SCAMPER Concept Matrix',
    coach: 'Ideation',
    phase: 'Divergence',
    summary:
      'Systematic creative reframing across Substitute, Combine, Adapt, Modify, Put to another use, Eliminate, and Reverse.',
    href: 'https://ideation-coach.vercel.app/',
  },
  {
    id: 'hmw-framing',
    name: 'How Might We Framing',
    coach: 'Ideation',
    phase: 'Problem Discovery',
    summary:
      'Converts rigid constraints and user friction into open-ended opportunity statements ready for team ideation.',
    href: 'https://ideation-coach.vercel.app/',
  },
  {
    id: 'crazy-eights',
    name: 'Rapid 8-Angle Sketching',
    coach: 'Ideation',
    phase: 'Concept Expansion',
    summary:
      'Time-boxed variation drills designed to move teams past obvious first answers toward unexpected directions.',
    href: 'https://ideation-coach.vercel.app/',
  },
  {
    id: 'design-thinking-loop',
    name: 'Double Diamond Design Sprint',
    coach: 'Innovation',
    phase: 'Validation',
    summary:
      'End-to-end corporate design thinking workflow linking ethnographic insight, rapid prototyping, and stakeholder testing.',
    href: 'https://innovation-coach.vercel.app/',
  },
  {
    id: 'venture-canvas',
    name: 'Corporate Venture Thesis Canvas',
    coach: 'Innovation',
    phase: 'Commercialization',
    summary:
      'Aligns strategic moat, unit economics, pilot milestones, and risk assumptions for internal investment committees.',
    href: 'https://innovation-coach.vercel.app/',
  },
  {
    id: 'assumption-mapping',
    name: 'Riskiest Assumption Testing',
    coach: 'Innovation',
    phase: 'De-risking',
    summary:
      'Prioritizes desirability, viability, and feasibility hypotheses before committing full engineering capacity.',
    href: 'https://innovation-coach.vercel.app/',
  },
];

export const TOP_NAV_LINKS = [
  {id: 'about', label: 'ABOUT'},
  {id: 'frameworks', label: 'FRAMEWORKS'},
  {id: 'contact', label: 'CONTACT'},
] as const;

export const SOCIAL_UTILITY_LINKS = [
  {
    label: 'GH',
    fullLabel: 'GitHub',
    href: 'https://github.com',
  },
  {
    label: 'LI',
    fullLabel: 'LinkedIn',
    href: 'https://www.linkedin.com',
  },
] as const;
