import {useCallback, useMemo, useState} from 'react';
import type {CoachSide} from '../types/coach';
import {getDesktopSplitGeometry, getMobileSplitGeometry} from '../utils/splitGeometry';

export function useSplitHover(initialSide: CoachSide | null = null) {
  const [hoveredSide, setHoveredSide] = useState<CoachSide | null>(initialSide);
  const [lockedSide, setLockedSide] = useState<CoachSide | null>(null);

  const activeSide: CoachSide | null = hoveredSide ?? lockedSide;

  const handleMouseEnter = useCallback((side: CoachSide) => {
    setHoveredSide(side);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoveredSide(null);
  }, []);

  const toggleLockSide = useCallback((side: CoachSide) => {
    setLockedSide((prev) => (prev === side ? null : side));
  }, []);

  const clearActiveSide = useCallback(() => {
    setHoveredSide(null);
    setLockedSide(null);
  }, []);

  const desktopGeometry = useMemo(
    () => getDesktopSplitGeometry(activeSide),
    [activeSide],
  );

  const mobileGeometry = useMemo(
    () => getMobileSplitGeometry(activeSide),
    [activeSide],
  );

  return {
    activeSide,
    hoveredSide,
    lockedSide,
    desktopGeometry,
    mobileGeometry,
    handleMouseEnter,
    handleMouseLeave,
    toggleLockSide,
    clearActiveSide,
  };
}
