import {useState, type CSSProperties} from 'react';
import type {CoachSide} from '../types/coach';

interface CentralIllustrationProps {
  activeSide: CoachSide | null;
}

export function CentralIllustration({activeSide}: CentralIllustrationProps) {
  const [hasError, setHasError] = useState(false);

  const assetUrl = `${import.meta.env.BASE_URL}assets/aistudio/image_cd629b00.png`;

  const desktopOffsetVw = activeSide === 'left' ? 5 : activeSide === 'right' ? -5 : 0;
  const mobileOffsetDvh = activeSide === 'left' ? 4 : activeSide === 'right' ? -4 : 0;

  const dragVars = {
    '--desktop-bulb-x': `${desktopOffsetVw}vw`,
    '--mobile-bulb-y': `${mobileOffsetDvh}dvh`,
  } as CSSProperties;

  return (
    <div
      aria-hidden="true"
      data-testid="central-illustration"
      data-drag-side={activeSide ?? 'none'}
      className="pointer-events-none absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2"
    >
      <div
        style={dragVars}
        className="central-drag-transition relative flex aspect-square w-[136px] max-h-[20dvh] items-center justify-center sm:w-[168px] md:w-[200px] md:max-h-[42dvh] lg:w-[240px] xl:w-[280px]"
      >
        {/* Brightening duotone ambient halo matching pink (#FF85B3) & amber (#FFD21F) */}
        <div
          className="absolute inset-1 rounded-full opacity-90 blur-2xl"
          style={{
            background:
              'radial-gradient(circle at 35% 45%, rgba(255, 224, 238, 0.94), transparent 62%), radial-gradient(circle at 68% 45%, rgba(255, 246, 184, 0.94), transparent 62%), radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.82), transparent 72%)',
          }}
        />

        {!hasError ? (
          <img
            src={assetUrl}
            alt="Pastel watercolor lightbulb bridging ideation and innovation"
            referrerPolicy="no-referrer"
            onError={() => setHasError(true)}
            className="relative z-10 h-full w-full object-contain brightness-[1.16] contrast-[1.06] saturate-[1.18] drop-shadow-[0_0_24px_rgba(255,255,255,0.65)]"
          />
        ) : (
          <div className="relative z-10 flex h-28 w-28 items-center justify-center rounded-full border border-white/60 bg-white/90 shadow-lg sm:h-36 sm:w-36">
            <i className="fa-solid fa-lightbulb text-4xl text-[#D93800]" />
          </div>
        )}
      </div>
    </div>
  );
}
