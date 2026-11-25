import {ArrowUpRight, X} from 'lucide-react';
import {COACH_PANELS, TOP_NAV_LINKS} from '../data/coaches';
import type {ModalSection} from '../types/coach';

interface NavigationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSection: (section: Exclude<ModalSection, null>) => void;
}

export function NavigationDrawer({
  isOpen,
  onClose,
  onSelectSection,
}: NavigationDrawerProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex"
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation"
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close menu backdrop"
        onClick={onClose}
        className="fixed inset-0 bg-black/45 backdrop-blur-[2px] transition-opacity"
      />

      {/* Drawer panel */}
      <aside className="relative z-10 flex h-full w-full max-w-sm flex-col justify-between bg-[#1A1A1A] p-6 text-white shadow-2xl sm:p-8">
        <div>
          <div className="flex items-center justify-between border-b border-white/10 pb-5">
            <span className="font-display text-sm font-bold tracking-[0.22em] uppercase">
              COACH HUB
            </span>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close navigation drawer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-white/80 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Direct Coach App Links */}
          <div className="mt-7">
            <p className="font-display text-[11px] font-semibold tracking-[0.22em] text-white/50 uppercase">
              Applications
            </p>
            <div className="mt-3 flex flex-col gap-3">
              {[COACH_PANELS.left, COACH_PANELS.right].map((panel) => (
                <a
                  key={panel.id}
                  href={panel.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={onClose}
                  className="group flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4 transition-colors hover:border-white/25 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-white"
                >
                  <div>
                    <div className="flex items-center gap-2.5">
                      <span
                        className={`font-display text-xs font-bold tabular-nums ${
                          panel.side === 'left' ? 'text-[#FF85B3]' : 'text-[#FFD21F]'
                        }`}
                      >
                        {panel.indexLabel}
                      </span>
                      <span className="font-display text-base font-bold text-white">
                        {panel.title}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-white/65">{panel.tagline}</p>
                  </div>
                  <ArrowUpRight
                    className="h-4 w-4 shrink-0 text-white/60 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white"
                    aria-hidden="true"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Hub Information Links */}
          <div className="mt-8">
            <p className="font-display text-[11px] font-semibold tracking-[0.22em] text-white/50 uppercase">
              Directory
            </p>
            <nav aria-label="Drawer navigation" className="mt-3 flex flex-col gap-1">
              {TOP_NAV_LINKS.map((link) => (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => onSelectSection(link.id)}
                  className="flex min-h-[44px] w-full items-center justify-between rounded-lg px-3 text-left font-display text-xs font-semibold tracking-[0.2em] text-white/85 uppercase transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-white"
                >
                  <span>{link.label}</span>
                  <span aria-hidden="true" className="text-white/40">
                    &rarr;
                  </span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        <div className="border-t border-white/10 pt-5 text-xs text-white/50">
          <span>Coach Hub</span>
          <span aria-hidden="true" className="mx-2">
            &middot;
          </span>
          <span>Est. 2026</span>
        </div>
      </aside>
    </div>
  );
}
