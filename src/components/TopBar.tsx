interface TopBarProps {
  onResetHome: () => void;
}

export function TopBar({onResetHome}: TopBarProps) {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-30 flex items-center justify-between gap-4 px-5 py-4 sm:px-8 sm:py-6 md:px-10">
      {/* Top-Left: Brand */}
      <div className="pointer-events-auto flex items-center">
        <button
          type="button"
          onClick={onResetHome}
          className="font-display whitespace-nowrap shrink-0 text-sm font-bold tracking-[0.22em] text-white uppercase transition-opacity hover:opacity-85 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:text-base"
        >
          COACH HUB
        </button>
      </div>
    </header>
  );
}
