/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type {CSSProperties} from 'react';
import {CentralIllustration} from './components/CentralIllustration';
import {CornerAccents} from './components/CornerAccents';
import {SlantedDivider} from './components/SlantedDivider';
import {SplitPanel} from './components/SplitPanel';
import {TopBar} from './components/TopBar';
import {COACH_PANELS} from './data/coaches';
import {useSplitHover} from './hooks/useSplitHover';

export default function App() {
  const {
    activeSide,
    desktopGeometry,
    mobileGeometry,
    handleMouseEnter,
    handleMouseLeave,
    toggleLockSide,
    clearActiveSide,
  } = useSplitHover();

  const splitCssVars = {
    '--desktop-left-clip': desktopGeometry.leftClipPath,
    '--desktop-right-clip': desktopGeometry.rightClipPath,
    '--mobile-left-clip': mobileGeometry.topClipPath,
    '--mobile-right-clip': mobileGeometry.bottomClipPath,
  } as CSSProperties;

  return (
    <div className="relative h-[100dvh] w-full overflow-hidden bg-[#1A1A1A]">
      <TopBar onResetHome={clearActiveSide} />

      <main
        style={splitCssVars}
        data-active-side={activeSide ?? 'none'}
        className="relative h-full w-full overflow-hidden"
      >
        <h1 className="sr-only">Coach Hub — Ideation Coach and Innovation Coach Gateway</h1>

        <SplitPanel
          config={COACH_PANELS.left}
          isActive={activeSide === 'left'}
          isOtherActive={activeSide === 'right'}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onFocus={handleMouseEnter}
          onBlur={handleMouseLeave}
        />

        <SplitPanel
          config={COACH_PANELS.right}
          isActive={activeSide === 'right'}
          isOtherActive={activeSide === 'left'}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onFocus={handleMouseEnter}
          onBlur={handleMouseLeave}
        />

        <SlantedDivider
          desktopGeometry={desktopGeometry}
          mobileGeometry={mobileGeometry}
        />

        <CentralIllustration activeSide={activeSide} />
      </main>

      <CornerAccents activeSide={activeSide} onSelectSide={toggleLockSide} />
    </div>
  );
}
