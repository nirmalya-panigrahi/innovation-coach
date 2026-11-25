import type {MobileSplitGeometry, SplitGeometry} from '../utils/splitGeometry';

interface SlantedDividerProps {
  desktopGeometry: SplitGeometry;
  mobileGeometry: MobileSplitGeometry;
}

export function SlantedDivider({desktopGeometry, mobileGeometry}: SlantedDividerProps) {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-10">
      {/* Desktop slanted seam */}
      <svg
        className="hidden h-full w-full md:block"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
      >
        <line
          x1={desktopGeometry.topPercent}
          y1="0"
          x2={desktopGeometry.bottomPercent}
          y2="100"
          stroke="rgba(255, 255, 255, 0.42)"
          strokeWidth="0.22"
          className="seam-line-transition"
        />
      </svg>

      {/* Mobile slanted horizontal seam */}
      <svg
        className="block h-full w-full md:hidden"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
      >
        <line
          x1="0"
          y1={mobileGeometry.leftEdgePercent}
          x2="100"
          y2={mobileGeometry.rightEdgePercent}
          stroke="rgba(255, 255, 255, 0.48)"
          strokeWidth="0.32"
          className="seam-line-transition"
        />
      </svg>
    </div>
  );
}
