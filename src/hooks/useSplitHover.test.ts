import {act, renderHook} from '@testing-library/react';
import {describe, expect, it} from 'vitest';
import {useSplitHover} from './useSplitHover';

describe('useSplitHover', () => {
  it('defaults to neutral 50/50 split and updates on hover', () => {
    const {result} = renderHook(() => useSplitHover());

    expect(result.current.activeSide).toBeNull();
    expect(result.current.desktopGeometry.leftWidthPercent).toBe(50);

    act(() => {
      result.current.handleMouseEnter('left');
    });
    expect(result.current.activeSide).toBe('left');
    expect(result.current.desktopGeometry.leftWidthPercent).toBe(55);

    act(() => {
      result.current.handleMouseLeave();
    });
    expect(result.current.activeSide).toBeNull();
    expect(result.current.desktopGeometry.leftWidthPercent).toBe(50);
  });

  it('toggles locked side and resets on second click or clear', () => {
    const {result} = renderHook(() => useSplitHover());

    act(() => {
      result.current.toggleLockSide('right');
    });
    expect(result.current.activeSide).toBe('right');
    expect(result.current.desktopGeometry.rightWidthPercent).toBe(55);

    act(() => {
      result.current.toggleLockSide('right');
    });
    expect(result.current.activeSide).toBeNull();

    act(() => {
      result.current.toggleLockSide('left');
      result.current.clearActiveSide();
    });
    expect(result.current.activeSide).toBeNull();
  });
});
