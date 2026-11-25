import {ArrowUpRight} from 'lucide-react';
import type {CoachPanelConfig, CoachSide} from '../types/coach';

interface SplitPanelProps {
  config: CoachPanelConfig;
  isActive: boolean;
  isOtherActive: boolean;
  onMouseEnter: (side: CoachSide) => void;
  onMouseLeave: () => void;
  onFocus: (side: CoachSide) => void;
  onBlur: () => void;
}

export function SplitPanel({
  config,
  isActive,
  isOtherActive,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
}: SplitPanelProps) {
  const isLeft = config.side === 'left';

  return (
    <a
      href={config.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${config.title} — ${config.tagline}. Opens in a new tab.`}
      data-testid={`panel-${config.side}`}
      onMouseEnter={() => onMouseEnter(config.side)}
      onMouseLeave={onMouseLeave}
      onFocus={() => onFocus(config.side)}
      onBlur={onBlur}
      className={`split-clip-transition group absolute inset-0 block cursor-pointer focus-visible:outline-none ${
        isLeft
          ? 'panel-clip-left bg-[#FF85B3] text-white'
          : 'panel-clip-right bg-[#FFD21F] text-[#1A1A1A]'
      }`}
    >
      {/* Subtle hover surface enrichment */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 transition-opacity duration-300 ${
          isActive ? 'opacity-100' : 'opacity-0'
        } ${
          isLeft
            ? 'bg-gradient-to-br from-[#FF9AC0]/35 via-transparent to-[#E35D93]/25'
            : 'bg-gradient-to-bl from-[#FFE055]/40 via-transparent to-[#F2B705]/25'
        }`}
      />

      {/* Content shaped cleanly away from the centered lightbulb image */}
      <div
        className={`relative z-10 flex h-full w-full flex-col px-5 sm:px-8 md:py-10 ${
          isLeft
            ? 'items-start justify-start pt-14 pb-2 md:items-start md:justify-center md:pl-10 lg:pl-14 xl:pl-20'
            : 'items-start justify-end pt-2 pb-12 sm:pb-14 md:items-end md:justify-center md:pr-10 lg:pr-14 xl:pr-20'
        }`}
      >
        <div
          className={`flex w-full max-w-[290px] flex-col transition-all duration-300 sm:max-w-[340px] md:max-w-[calc(45vw-158px)] lg:max-w-[calc(45vw-196px)] xl:max-w-[min(360px,calc(45vw-244px))] ${
            isLeft ? 'items-start text-left' : 'items-start text-left md:items-end md:text-right'
          } ${isOtherActive ? 'md:opacity-75' : 'opacity-100'} ${
            isActive ? 'md:-translate-y-0.5' : ''
          }`}
        >
          {/* Editorial Kicker */}
          <div
            className={`mb-2.5 flex items-center sm:mb-4 ${
              isLeft ? 'justify-start' : 'justify-start md:justify-end'
            }`}
          >
            <span
              className={`font-display text-[11px] font-bold tracking-[0.2em] uppercase sm:text-xs ${
                isLeft ? 'text-white/95' : 'text-[#D93800]'
              }`}
            >
              {config.indexLabel} · {config.kicker}
            </span>
          </div>

          {/* Primary Display Title */}
          <h2
            className={`font-display text-[clamp(1.55rem,3vw,2.95rem)] font-extrabold leading-[1.06] tracking-[-0.03em] text-balance ${
              isLeft ? 'text-white drop-shadow-[0_1px_2px_rgba(140,20,70,0.18)]' : 'text-[#1A1A1A]'
            }`}
          >
            {config.title}
          </h2>

          {/* Tagline */}
          <p
            className={`mt-1.5 max-w-[28ch] text-sm font-medium leading-snug sm:mt-2.5 sm:text-base lg:text-lg ${
              isLeft ? 'text-white/95' : 'text-[#1A1A1A]/85'
            }`}
          >
            {config.tagline}
          </p>

          {/* Supporting prose (desktop / large tablet) */}
          <p
            className={`mt-2 hidden max-w-[34ch] text-sm leading-relaxed md:block ${
              isLeft ? 'text-white/85' : 'text-[#1A1A1A]/75'
            }`}
          >
            {config.description}
          </p>

          {/* Dedicated CTA Visual Action */}
          <div className="mt-4 sm:mt-7">
            <span
              className={`inline-flex min-h-[44px] items-center gap-2.5 rounded-lg px-5 py-2.5 font-display text-xs font-bold tracking-[0.12em] uppercase whitespace-nowrap shrink-0 transition-all duration-200 sm:text-sm ${
                isLeft
                  ? 'bg-white text-[#9D174D] shadow-sm group-hover:bg-[#FFF5F9] group-focus-visible:ring-2 group-focus-visible:ring-white group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-[#FF85B3]'
                  : 'bg-[#1A1A1A] text-[#FFD21F] shadow-sm group-hover:bg-[#D93800] group-hover:text-white group-focus-visible:ring-2 group-focus-visible:ring-[#1A1A1A] group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-[#FFD21F]'
              }`}
            >
              <span>{config.ctaLabel}</span>
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </span>
          </div>
        </div>
      </div>
    </a>
  );
}
