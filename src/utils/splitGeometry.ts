import type {CoachSide} from '../types/coach';

export interface SplitGeometry {
  topPercent: number;
  bottomPercent: number;
  leftClipPath: string;
  rightClipPath: string;
  leftWidthPercent: number;
  rightWidthPercent: number;
}

export interface MobileSplitGeometry {
  leftEdgePercent: number;
  rightEdgePercent: number;
  topClipPath: string;
  bottomClipPath: string;
}

const DEFAULT_SLANT_OFFSET = 4;
const HOVER_SHIFT = 5;

function clampPercent(value: number, min: number, max: number): number {
  if (!Number.isFinite(value)) {
    return 50;
  }
  return Math.min(max, Math.max(min, value));
}

/**
 * Computes responsive desktop slanted split geometry.
 * At rest: top 54% -> bottom 46% (50/50 balanced area passing dead-center at 50%).
 * On left hover: shifts right to 55/45 area (top 59% -> bottom 51%).
 * On right hover: shifts left to 45/55 area (top 49% -> bottom 41%).
 */
export function getDesktopSplitGeometry(
  activeSide: CoachSide | null,
  slantOffset: number = DEFAULT_SLANT_OFFSET,
): SplitGeometry {
  const safeOffset = clampPercent(Math.abs(slantOffset), 0, 12);

  let centerPercent = 50;
  if (activeSide === 'left') {
    centerPercent = 50 + HOVER_SHIFT;
  } else if (activeSide === 'right') {
    centerPercent = 50 - HOVER_SHIFT;
  }

  const topPercent = clampPercent(centerPercent + safeOffset, 15, 85);
  const bottomPercent = clampPercent(centerPercent - safeOffset, 15, 85);

  return {
    topPercent,
    bottomPercent,
    leftClipPath: `polygon(0% 0%, ${topPercent}% 0%, ${bottomPercent}% 100%, 0% 100%)`,
    rightClipPath: `polygon(${topPercent}% 0%, 100% 0%, 100% 100%, ${bottomPercent}% 100%)`,
    leftWidthPercent: centerPercent,
    rightWidthPercent: 100 - centerPercent,
  };
}

/**
 * Computes mobile stacked slanted split geometry (50dvh / 50dvh average height).
 */
export function getMobileSplitGeometry(activeSide: CoachSide | null): MobileSplitGeometry {
  let centerY = 50;
  if (activeSide === 'left') {
    centerY = 54;
  } else if (activeSide === 'right') {
    centerY = 46;
  }

  const leftEdgePercent = clampPercent(centerY + 2.5, 25, 75);
  const rightEdgePercent = clampPercent(centerY - 2.5, 25, 75);

  return {
    leftEdgePercent,
    rightEdgePercent,
    topClipPath: `polygon(0% 0%, 100% 0%, 100% ${rightEdgePercent}%, 0% ${leftEdgePercent}%)`,
    bottomClipPath: `polygon(0% ${leftEdgePercent}%, 100% ${rightEdgePercent}%, 100% 100%, 0% 100%)`,
  };
}
