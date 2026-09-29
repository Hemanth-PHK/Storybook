export interface VideoCaption {
  src: string;
  srcLang: string;
  label: string;
  default?: boolean;
}

export interface VideoQuality {
  label: string;
  src: string;
}

export interface VideoLanguage {
  label: string;
  src: string;
}

export interface VideoPlayerContainerProps {
  src: string;
  title: string;
  poster?: string;
  captions?: VideoCaption[];
  qualities?: VideoQuality[];
  languages?: VideoLanguage[];
  initialPosition?: number;
  onProgress?: (currentTime: number, duration: number) => void;
  onResume?: (currentTime: number) => void;
  onComplete?: () => void;
  unavailable?: boolean;
  className?: string;
}

export type MenuType =
  | "main"
  | "speed"
  | "quality"
  | "language"
  | "captions"
  | null;

export const SPEEDS = [0.5, 1, 1.25, 1.5, 2];

export const formatTime = (value: number) => {
  if (!Number.isFinite(value)) {
    return "0:00";
  }

  const minutes = Math.floor(value / 60);

  const seconds = Math.floor(value % 60)
    .toString()
    .padStart(2, "0");

  return `${minutes}:${seconds}`;
};