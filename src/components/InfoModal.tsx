import {ArrowUpRight, CheckCircle2, Search, X} from 'lucide-react';
import {useMemo, useState, type FormEvent} from 'react';
import {COACH_PANELS, FRAMEWORK_DIRECTORY} from '../data/coaches';
import type {ContactFormData, ContactValidationErrors, ModalSection} from '../types/coach';
import {validateContactForm} from '../utils/validation';

interface InfoModalProps {
  section: ModalSection;
  onClose: () => void;
  onSwitchSection: (section: Exclude<ModalSection, null>) => void;
}

const INITIAL_CONTACT: ContactFormData = {
  name: '',
  email: '',
  topic: 'general',
  message: '',
};

export function InfoModal({section, onClose, onSwitchSection}: InfoModalProps) {
  const [frameworkFilter, setFrameworkFilter] = useState<'All' | 'Ideation' | 'Innovation'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState<ContactFormData>(INITIAL_CONTACT);
  const [errors, setErrors] = useState<ContactValidationErrors>({});
  const [submittedRecord, setSubmittedRecord] = useState<ContactFormData | null>(null);

  const filteredFrameworks = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();
    return FRAMEWORK_DIRECTORY.filter((item) => {
      const matchesFilter = frameworkFilter === 'All' || item.coach === frameworkFilter;
      const matchesQuery =
        !normalizedQuery ||
        item.name.toLowerCase().includes(normalizedQuery) ||
        item.phase.toLowerCase().includes(normalizedQuery) ||
        item.summary.toLowerCase().includes(normalizedQuery);
      return matchesFilter && matchesQuery;
    });
  }, [frameworkFilter, searchQuery]);

  if (!section) {
    return null;
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = validateContactForm(formData);
    if (!result.isValid) {
      setErrors(result.errors);
      return;
    }
    setErrors({});
    setSubmittedRecord(result.sanitized);
    setFormData(INITIAL_CONTACT);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-heading"
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close modal backdrop"
        onClick={onClose}
        className="fixed inset-0 bg-black/55 backdrop-blur-xs transition-opacity"
      />

      {/* Modal Container */}
      <div className="relative z-10 max-h-[88dvh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-black/10 bg-white p-6 text-[#1A1A1A] shadow-2xl sm:p-8">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-black/10 pb-4">
          <div>
            <p className="font-display text-[11px] font-bold tracking-[0.22em] text-[#D93800] uppercase">
              Coach Hub
            </p>
            <h2
              id="modal-heading"
              className="font-display mt-1 text-2xl font-extrabold tracking-tight text-[#1A1A1A]"
            >
              {section === 'about' && 'Two disciplines, one connected workflow'}
              {section === 'frameworks' && 'Core Coaching Frameworks'}
              {section === 'contact' && 'Get in touch'}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-[#1A1A1A]/70 transition-colors hover:bg-black/5 hover:text-[#1A1A1A] focus-visible:outline-2 focus-visible:outline-[#1A1A1A]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* ABOUT CONTENT */}
        {section === 'about' && (
          <div className="mt-6 space-y-6">
            <p className="text-base leading-relaxed text-[#1A1A1A]/80">
              Coach Hub serves as the central gateway between divergent concept exploration and
              disciplined corporate venture execution. Choose the workspace that fits your stage:
            </p>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-[#FF85B3]/40 bg-[#FFF5F9] p-5">
                <div className="flex items-center gap-2.5">
                  <i className="fa-solid fa-lightbulb text-[#B81D65]" aria-hidden="true" />
                  <h3 className="font-display text-lg font-bold text-[#1A1A1A]">
                    01. {COACH_PANELS.left.title}
                  </h3>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-[#1A1A1A]/75">
                  {COACH_PANELS.left.description}
                </p>
                <a
                  href={COACH_PANELS.left.href}
                  className="font-display mt-4 inline-flex items-center gap-1.5 text-xs font-bold tracking-[0.12em] text-[#B81D65] uppercase hover:underline"
                >
                  <span>{COACH_PANELS.left.ctaLabel}</span>
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </div>

              <div className="rounded-xl border border-[#FFD21F]/60 bg-[#FFFBEA] p-5">
                <div className="flex items-center gap-2.5">
                  <i className="fa-solid fa-rocket text-[#D93800]" aria-hidden="true" />
                  <h3 className="font-display text-lg font-bold text-[#1A1A1A]">
                    02. {COACH_PANELS.right.title}
                  </h3>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-[#1A1A1A]/75">
                  {COACH_PANELS.right.description}
                </p>
                <a
                  href={COACH_PANELS.right.href}
                  className="font-display mt-4 inline-flex items-center gap-1.5 text-xs font-bold tracking-[0.12em] text-[#D93800] uppercase hover:underline"
                >
                  <span>{COACH_PANELS.right.ctaLabel}</span>
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-black/10 pt-4">
              <button
                type="button"
                onClick={() => onSwitchSection('frameworks')}
                className="font-display text-xs font-bold tracking-[0.14em] text-[#1A1A1A] uppercase underline underline-offset-4 hover:text-[#D93800]"
              >
                Browse all frameworks
              </button>
              <button
                type="button"
                onClick={() => onSwitchSection('contact')}
                className="font-display rounded-lg bg-[#1A1A1A] px-4 py-2 text-xs font-bold tracking-[0.12em] text-white uppercase transition-colors hover:bg-[#D93800]"
              >
                Contact team
              </button>
            </div>
          </div>
        )}

        {/* FRAMEWORKS CONTENT */}
        {section === 'frameworks' && (
          <div className="mt-6 space-y-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div
                role="tablist"
                aria-label="Filter frameworks by coach"
                className="inline-flex items-center gap-1 rounded-lg bg-neutral-100 p-1"
              >
                {(['All', 'Ideation', 'Innovation'] as const).map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    role="tab"
                    aria-selected={frameworkFilter === tab}
                    onClick={() => setFrameworkFilter(tab)}
                    className={`min-h-[36px] rounded-md px-3 py-1.5 font-display text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                      frameworkFilter === tab
                        ? 'bg-white text-[#1A1A1A] shadow-xs'
                        : 'text-[#1A1A1A]/65 hover:text-[#1A1A1A]'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="relative flex-1 sm:max-w-[220px]">
                <Search
                  className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#1A1A1A]/45"
                  aria-hidden="true"
                />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Filter frameworks..."
                  aria-label="Filter frameworks"
                  className="min-h-[40px] w-full rounded-lg border border-black/15 bg-white py-1.5 pl-9 pr-3 text-sm text-[#1A1A1A] placeholder:text-[#1A1A1A]/45 focus:border-[#1A1A1A] focus:outline-none"
                />
              </div>
            </div>

            {filteredFrameworks.length === 0 ? (
              <div className="rounded-xl border border-dashed border-black/15 px-6 py-10 text-center">
                <p className="font-display text-sm font-bold text-[#1A1A1A]">
                  No frameworks matched &ldquo;{searchQuery}&rdquo;
                </p>
                <p className="mt-1 text-xs text-[#1A1A1A]/65">
                  Try clearing your search or switching back to All frameworks.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setFrameworkFilter('All');
                    setSearchQuery('');
                  }}
                  className="mt-4 rounded-lg border border-black/15 px-3.5 py-2 font-display text-xs font-semibold text-[#1A1A1A] hover:bg-neutral-100"
                >
                  Reset filters
                </button>
              </div>
            ) : (
              <ul className="divide-y divide-black/10 border-t border-black/10">
                {filteredFrameworks.map((fw) => (
                  <li key={fw.id} className="py-4">
                    <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                      <div>
                        <div className="flex items-center gap-2 text-xs text-[#1A1A1A]/60">
                          <span
                            className={`font-semibold ${
                              fw.coach === 'Ideation' ? 'text-[#B81D65]' : 'text-[#D93800]'
                            }`}
                          >
                            {fw.coach} Coach
                          </span>
                          <span aria-hidden="true">&middot;</span>
                          <span>{fw.phase}</span>
                        </div>
                        <h3 className="font-display mt-1 text-base font-bold text-[#1A1A1A]">
                          {fw.name}
                        </h3>
                        <p className="mt-1 text-sm leading-relaxed text-[#1A1A1A]/75">
                          {fw.summary}
                        </p>
                      </div>
                      <a
                        href={fw.href}
                        className="inline-flex min-h-[36px] shrink-0 items-center gap-1.5 self-start rounded-lg border border-black/15 px-3 py-1.5 font-display text-xs font-semibold text-[#1A1A1A] transition-colors hover:bg-[#1A1A1A] hover:text-white"
                      >
                        <span>Launch</span>
                        <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </a>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* CONTACT CONTENT */}
        {section === 'contact' && (
          <div className="mt-6">
            {submittedRecord ? (
              <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-6">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-700" aria-hidden="true" />
                  <div>
                    <h3 className="font-display text-base font-bold text-emerald-950">
                      Inquiry prepared for {submittedRecord.name}
                    </h3>
                    <p className="mt-1 text-sm text-emerald-900/80">
                      Your message regarding <span className="font-semibold">{submittedRecord.topic}</span>{' '}
                      has been validated for <span className="font-semibold">{submittedRecord.email}</span>.
                    </p>
                    <button
                      type="button"
                      onClick={() => setSubmittedRecord(null)}
                      className="mt-4 rounded-lg bg-emerald-900 px-4 py-2 font-display text-xs font-bold tracking-[0.1em] text-white uppercase hover:bg-emerald-800"
                    >
                      Send another message
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block font-display text-xs font-bold tracking-[0.12em] text-[#1A1A1A] uppercase"
                    >
                      Name
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={(event) => {
                        setFormData((prev) => ({...prev, name: event.target.value}));
                        if (errors.name) setErrors((prev) => ({...prev, name: undefined}));
                      }}
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? 'contact-name-error' : undefined}
                      placeholder="Alex Rivera"
                      className="mt-1.5 min-h-[44px] w-full rounded-lg border border-black/15 px-3.5 py-2 text-sm text-[#1A1A1A] focus:border-[#1A1A1A] focus:outline-none"
                    />
                    {errors.name && (
                      <p id="contact-name-error" role="alert" className="mt-1 text-xs font-medium text-[#D93800]">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block font-display text-xs font-bold tracking-[0.12em] text-[#1A1A1A] uppercase"
                    >
                      Email
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={(event) => {
                        setFormData((prev) => ({...prev, email: event.target.value}));
                        if (errors.email) setErrors((prev) => ({...prev, email: undefined}));
                      }}
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? 'contact-email-error' : undefined}
                      placeholder="alex@company.com"
                      className="mt-1.5 min-h-[44px] w-full rounded-lg border border-black/15 px-3.5 py-2 text-sm text-[#1A1A1A] focus:border-[#1A1A1A] focus:outline-none"
                    />
                    {errors.email && (
                      <p id="contact-email-error" role="alert" className="mt-1 text-xs font-medium text-[#D93800]">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-topic"
                    className="block font-display text-xs font-bold tracking-[0.12em] text-[#1A1A1A] uppercase"
                  >
                    Topic
                  </label>
                  <select
                    id="contact-topic"
                    name="topic"
                    value={formData.topic}
                    onChange={(event) =>
                      setFormData((prev) => ({
                        ...prev,
                        topic: event.target.value as ContactFormData['topic'],
                      }))
                    }
                    className="mt-1.5 min-h-[44px] w-full rounded-lg border border-black/15 bg-white px-3.5 py-2 text-sm text-[#1A1A1A] focus:border-[#1A1A1A] focus:outline-none"
                  >
                    <option value="general">General Question</option>
                    <option value="ideation">Ideation Coach</option>
                    <option value="innovation">Innovation Coach</option>
                    <option value="partnership">Enterprise Workshop</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block font-display text-xs font-bold tracking-[0.12em] text-[#1A1A1A] uppercase"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={(event) => {
                      setFormData((prev) => ({...prev, message: event.target.value}));
                      if (errors.message) setErrors((prev) => ({...prev, message: undefined}));
                    }}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? 'contact-message-error' : undefined}
                    placeholder="Share your team goals or framework feedback..."
                    className="mt-1.5 w-full rounded-lg border border-black/15 px-3.5 py-2.5 text-sm text-[#1A1A1A] focus:border-[#1A1A1A] focus:outline-none"
                  />
                  {errors.message && (
                    <p id="contact-message-error" role="alert" className="mt-1 text-xs font-medium text-[#D93800]">
                      {errors.message}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="min-h-[44px] rounded-lg px-4 py-2 font-display text-xs font-semibold text-[#1A1A1A]/75 hover:bg-neutral-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="min-h-[44px] rounded-lg bg-[#1A1A1A] px-5 py-2 font-display text-xs font-bold tracking-[0.12em] text-white uppercase transition-colors hover:bg-[#D93800]"
                  >
                    Send message
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
