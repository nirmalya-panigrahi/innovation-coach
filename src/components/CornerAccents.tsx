import type {CoachSide} from '../types/coach';

interface CornerAccentsProps {
  activeSide: CoachSide | null;
  onSelectSide: (side: CoachSide) => void;
}

export function CornerAccents({activeSide, onSelectSide}: CornerAccentsProps) {
  return (
    <div
      role="group"
      aria-label="Panel preview selector"
      className="pointer-events-auto fixed bottom-4 right-5 z-30 flex items-center gap-2 sm:bottom-6 sm:right-8 md:right-10"
    >
      <button
        type="button"
        onClick={() => onSelectSide('left')}
        aria-pressed={activeSide === 'left'}
        aria-label="Highlight Ideation Coach (01)"
        className={`font-display inline-flex min-h-[40px] items-center px-1.5 text-xs font-bold tracking-[0.18em] tabular-nums transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1A1A1A] ${
          activeSide === 'left'
            ? 'scale-110 text-[#D93800] underline decoration-2 underline-offset-4'
            : 'text-[#1A1A1A]/55 hover:text-[#1A1A1A]'
        }`}
      >
        01
      </button>

      <span aria-hidden="true" className="font-display text-xs text-[#1A1A1A]/35">
        /
      </span>

      <button
        type="button"
        onClick={() => onSelectSide('right')}
        aria-pressed={activeSide === 'right'}
        aria-label="Highlight Innovation Coach (02)"
        className={`font-display inline-flex min-h-[40px] items-center px-1.5 text-xs font-bold tracking-[0.18em] tabular-nums transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1A1A1A] ${
          activeSide === 'right'
            ? 'scale-110 text-[#D93800] underline decoration-2 underline-offset-4'
            : 'text-[#1A1A1A]/55 hover:text-[#1A1A1A]'
        }`}
      >
        02
      </button>
    </div>
  );
}
