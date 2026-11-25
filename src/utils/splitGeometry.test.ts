import {describe, expect, it} from 'vitest';
import {getDesktopSplitGeometry, getMobileSplitGeometry} from './splitGeometry';

describe('getDesktopSplitGeometry', () => {
  // Blue Pill: Happy-path scenarios
  it('returns balanced 50/50 slanted geometry at rest', () => {
    const geometry = getDesktopSplitGeometry(null);
    expect(geometry.leftWidthPercent).toBe(50);
    expect(geometry.rightWidthPercent).toBe(50);
    expect(geometry.topPercent).toBe(54);
    expect(geometry.bottomPercent).toBe(46);
    expect(geometry.leftClipPath).toBe('polygon(0% 0%, 54% 0%, 46% 100%, 0% 100%)');
    expect(geometry.rightClipPath).toBe('polygon(54% 0%, 100% 0%, 100% 100%, 46% 100%)');
  });

  it('expands left panel to 55/45 when left side is active', () => {
    const geometry = getDesktopSplitGeometry('left');
    expect(geometry.leftWidthPercent).toBe(55);
    expect(geometry.rightWidthPercent).toBe(45);
    expect(geometry.topPercent).toBe(59);
    expect(geometry.bottomPercent).toBe(51);
  });

  it('expands right panel to 55/45 when right side is active', () => {
    const geometry = getDesktopSplitGeometry('right');
    expect(geometry.leftWidthPercent).toBe(45);
    expect(geometry.rightWidthPercent).toBe(55);
    expect(geometry.topPercent).toBe(49);
    expect(geometry.bottomPercent).toBe(41);
  });

  // Red Pill: Adversarial and edge-case inputs
  it('clamps extreme slant offsets and normalizes negative values', () => {
    const extreme = getDesktopSplitGeometry('left', 95);
    expect(extreme.topPercent).toBeLessThanOrEqual(85);
    expect(extreme.bottomPercent).toBeGreaterThanOrEqual(15);

    const negative = getDesktopSplitGeometry(null, -4);
    expect(negative.topPercent).toBe(54);
    expect(negative.bottomPercent).toBe(46);
  });

  it('handles NaN and Infinity slant offsets safely', () => {
    const nanGeo = getDesktopSplitGeometry(null, Number.NaN);
    expect(nanGeo.topPercent).toBe(85);
    expect(nanGeo.leftClipPath).not.toContain('NaN');

    const infGeo = getDesktopSplitGeometry('right', Number.POSITIVE_INFINITY);
    expect(infGeo.leftClipPath).not.toContain('Infinity');
  });
});

describe('getMobileSplitGeometry', () => {
  it('computes slanted horizontal split for stacked mobile layout', () => {
    const rest = getMobileSplitGeometry(null);
    expect(rest.leftEdgePercent).toBe(52.5);
    expect(rest.rightEdgePercent).toBe(47.5);

    const leftActive = getMobileSplitGeometry('left');
    expect(leftActive.leftEdgePercent).toBeGreaterThan(rest.leftEdgePercent);

    const rightActive = getMobileSplitGeometry('right');
    expect(rightActive.leftEdgePercent).toBeLessThan(rest.leftEdgePercent);
  });
});
