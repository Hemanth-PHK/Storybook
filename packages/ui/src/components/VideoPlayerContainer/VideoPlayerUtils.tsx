export type MediaOption = {
  label: string;
  src: string;
};

export type CaptionOption = {
  src: string;
  srcLang: string;
  label: string;
  default?: boolean;
};

export interface VideoPlayerContainerProps {
  src: string;
  title: string;
  poster?: string;
  captions?: CaptionOption[];
  qualities?: MediaOption[];
  languages?: MediaOption[];
  initialPosition?: number;
  onProgress?: (currentTime: number, duration: number) => void;
  onResume?: (currentTime: number) => void;
  onComplete?: () => void;
  unavailable?: boolean;
  className?: string;
}

export const PLAYBACK_SPEEDS = [0.5, 0.75, 1, 1.25, 1.5, 2];

export const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

export function formatTime(value: number) {
  if (!Number.isFinite(value) || value < 0) return "0:00";

  const seconds = Math.floor(value);
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = String(seconds % 60).padStart(2, "0");

  return h
    ? `${h}:${String(m).padStart(2, "0")}:${s}`
    : `${m}:${s}`;
}