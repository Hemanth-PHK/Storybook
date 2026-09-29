import React from "react";

interface ControlButtonProps {
  label: string;
  children: React.ReactNode;
  onClick: () => void;
  expanded?: boolean;
}

export function ControlButton({
  label,
  children,
  onClick,
  expanded,
}: ControlButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-expanded={expanded}
      onClick={onClick}
      className="rounded px-2 py-1 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white"
    >
      {children}
    </button>
  );
}

interface ProgressBarProps {
  duration: number;
  currentTime: number;
  progress: number;
  onSeek: (
    event: React.MouseEvent<HTMLDivElement>
  ) => void;
  onKeyDown: (
    event: React.KeyboardEvent<HTMLDivElement>
  ) => void;
}

export function ProgressBar({
  duration,
  currentTime,
  progress,
  onSeek,
  onKeyDown,
}: ProgressBarProps) {
  return (
    <div
      role="slider"
      aria-label="Video progress"
      aria-valuemin={0}
      aria-valuemax={duration}
      aria-valuenow={currentTime}
      tabIndex={0}
      onClick={(event) => {
        event.stopPropagation();
        onSeek(event);
      }}
      onKeyDown={onKeyDown}
      className="absolute bottom-12 left-3 right-3 z-20 h-1.5 cursor-pointer rounded-full bg-white/30 focus:outline-none focus:ring-2 focus:ring-primary"
    >
      <div
        className="h-full rounded-full bg-red-600"
        style={{
          width: `${progress}%`,
        }}
      />
    </div>
  );
}

interface SeekFeedbackProps {
  side: "left" | "right";
  text: string;
}

export function SeekFeedback({
  side,
  text,
}: SeekFeedbackProps) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute top-1/2 z-10 -translate-y-1/2 select-none text-4xl font-bold text-white ${
        side === "left" ? "left-6" : "right-6"
      }`}
    >
      {text}
    </div>
  );
}