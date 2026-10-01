import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";

import {
  clamp,
  formatTime,
  PLAYBACK_SPEEDS,
  type VideoPlayerContainerProps,
} from "./VideoPlayerUtils";

type SettingsMenu = "main" | "speed" | "captions" | "quality" | "audio" | null;

const buttonClass =
  "rounded p-2 text-sm hover:bg-white/20 focus-visible:outline " +
  "focus-visible:outline-2 focus-visible:outline-white";

export function VideoPlayerContainer(props: VideoPlayerContainerProps) {
  return <Player key={props.src} {...props} />;
}

function Player({
  src,
  title,
  poster,
  captions = [],
  qualities = [],
  languages = [],
  initialPosition = 0,
  onProgress,
  onResume,
  onComplete,
  unavailable = false,
  className = "",
}: VideoPlayerContainerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const rootRef = useRef<HTMLElement>(null);
  const initialized = useRef(false);
  const resumed = useRef(false);

  const pendingSource = useRef<{
    time: number;
    shouldPlay: boolean;
  } | null>(null);

  const [source, setSource] = useState(src);
  const [reload, setReload] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [fullscreen, setFullscreen] = useState(false);
  const [buffering, setBuffering] = useState(false);
  const [error, setError] = useState(false);

  const [menu, setMenu] = useState<SettingsMenu>(null);
  const [quality, setQuality] = useState("");
  const [audio, setAudio] = useState("");
  const [caption, setCaption] = useState(
    captions.find((item) => item.default)?.srcLang ?? "off"
  );

  const video = () => videoRef.current;

  useEffect(() => {
    const syncFullscreen = () => {
      setFullscreen(document.fullscreenElement === rootRef.current);
    };

    document.addEventListener("fullscreenchange", syncFullscreen);

    return () => {
      document.removeEventListener("fullscreenchange", syncFullscreen);
    };
  }, []);

  const syncCaptions = () => {
    const tracks = video()?.textTracks;
    if (!tracks) return;

    for (let i = 0; i < tracks.length; i++) {
      tracks[i].mode =
        caption !== "off" && tracks[i].language === caption
          ? "showing"
          : "disabled";
    }
  };

  useEffect(syncCaptions, [caption, source, reload]);

  const togglePlay = () => {
    const v = video();
    if (!v) return;

    if (v.paused) {
      void v.play().catch(() => setPlaying(false));
    } else {
      v.pause();
    }
  };

  const seek = (seconds: number) => {
    const v = video();

    if (!v || !Number.isFinite(v.duration)) return;

    v.currentTime = clamp(seconds, 0, v.duration);
    setTime(v.currentTime);
  };

  const changeVolume = (value: number) => {
    const v = video();
    if (!v) return;

    v.volume = clamp(value, 0, 1);
    v.muted = v.volume === 0;

    setVolume(v.volume);
    setMuted(v.muted);
  };

  const toggleMute = () => {
    const v = video();
    if (!v) return;

    v.muted = !v.muted;
    setMuted(v.muted);
  };

  const changeSpeed = (value: number) => {
    const v = video();
    if (v) v.playbackRate = value;

    setSpeed(value);
    setMenu(null);
  };

  const toggleFullscreen = () => {
    const root = rootRef.current;
    if (!root) return;

    if (document.fullscreenElement === root) {
      void document.exitFullscreen().catch(() => {});
    } else if (!document.fullscreenElement) {
      void root.requestFullscreen().catch(() => {});
    }
  };

  const switchSource = (
    nextSrc: string,
    label: string,
    type: "quality" | "audio"
  ) => {
    const v = video();
    if (!v) return;

    setMenu(null);

    if (nextSrc === source) return;

    pendingSource.current = {
      time: v.currentTime,
      shouldPlay: !v.paused && !v.ended,
    };

    // These props represent alternative complete media files.
    // Changing one resets the other source selection.
    if (type === "quality") {
      setQuality(label);
      setAudio("");
    } else {
      setAudio(label);
      setQuality("");
    }

    setError(false);
    setBuffering(true);
    setSource(nextSrc);
  };

  const onMetadata = () => {
    const v = video();
    if (!v) return;

    const validDuration = Number.isFinite(v.duration) ? v.duration : 0;

    setDuration(validDuration);
    v.playbackRate = speed;

    const pending = pendingSource.current;
    pendingSource.current = null;

    if (pending) {
      seek(pending.time);

      if (pending.shouldPlay) {
        void v.play().catch(() => setPlaying(false));
      }

      return;
    }

    if (!initialized.current) {
      initialized.current = true;

      if (initialPosition > 0 && validDuration > 0) {
        seek(Math.min(initialPosition, validDuration));
      }
    }
  };

  const onKeyboard = (event: KeyboardEvent<HTMLElement>) => {
    const v = video();
    if (!v || error || unavailable) return;

    if (event.altKey || event.ctrlKey || event.metaKey) return;

    const target = event.target;

    // Do not interfere with native controls or focused settings.
    if (
      target instanceof HTMLInputElement ||
      target instanceof HTMLSelectElement ||
      target instanceof HTMLTextAreaElement
    ) {
      return;
    }

    if (
      target instanceof HTMLButtonElement &&
      (event.key === " " || event.key === "Enter")
    ) {
      return;
    }

    if (event.key === "Escape" && menu) {
      setMenu(null);
      event.stopPropagation();
      return;
    }

    const key =
      event.key.length === 1
        ? event.key.toLowerCase()
        : event.key;

    const actions: Record<string, () => void> = {
      " ": togglePlay,
      k: togglePlay,

      ArrowLeft: () => seek(v.currentTime - 5),
      ArrowRight: () => seek(v.currentTime + 5),

      j: () => seek(v.currentTime - 10),
      l: () => seek(v.currentTime + 10),

      ArrowUp: () => changeVolume(v.volume + 0.05),
      ArrowDown: () => changeVolume(v.volume - 0.05),

      m: toggleMute,
      f: toggleFullscreen,

      Home: () => seek(0),
      End: () => seek(v.duration),
    };

    const action =
      actions[key] ??
      (/^[0-9]$/.test(key)
        ? () => seek((v.duration * Number(key)) / 10)
        : undefined);

    if (!action) return;

    event.preventDefault();
    action();
  };

  const retry = () => {
    pendingSource.current = null;
    setSource(src);
    setQuality("");
    setAudio("");
    setError(false);
    setBuffering(true);
    setReload((value) => value + 1);
  };

  if (unavailable || !src) {
    return (
      <div
        role="status"
        className={`flex aspect-video items-center justify-center
          rounded-lg bg-black p-4 text-white ${className}`}
      >
        Video unavailable
      </div>
    );
  }

  return (
    <section
      ref={rootRef}
      role="region"
      tabIndex={0}
      aria-label={`${title} video player`}
      onKeyDownCapture={onKeyboard}
      className={`relative isolate aspect-video w-full overflow-hidden
        rounded-lg bg-black text-white
        focus-visible:outline focus-visible:outline-2
        fullscreen:h-screen fullscreen:w-screen
        fullscreen:aspect-auto fullscreen:rounded-none
        ${className}`}
    >
      <video
        key={`${source}-${reload}`}
        ref={videoRef}
        src={source}
        poster={poster}
        playsInline
        preload="metadata"
        tabIndex={-1}
        aria-label={title}
        className="absolute inset-0 h-full w-full cursor-pointer object-contain"
        onClick={() => {
          rootRef.current?.focus();
          togglePlay();
        }}
        onLoadedMetadata={onMetadata}
        onLoadedData={syncCaptions}
        onWaiting={() => setBuffering(true)}
        onCanPlay={() => setBuffering(false)}
        onPlaying={() => {
          setPlaying(true);
          setBuffering(false);
        }}
        onPause={() => setPlaying(false)}
        onTimeUpdate={(event) => {
          const v = event.currentTarget;

          setTime(v.currentTime);

          if (Number.isFinite(v.duration)) {
            onProgress?.(v.currentTime, v.duration);
          }
        }}
        onPlay={(event) => {
          if (!resumed.current && initialPosition > 0) {
            resumed.current = true;
            onResume?.(event.currentTarget.currentTime);
          }
        }}
        onEnded={() => {
          setPlaying(false);
          onComplete?.();
        }}
        onVolumeChange={(event) => {
          setVolume(event.currentTarget.volume);
          setMuted(event.currentTarget.muted);
        }}
        onError={() => {
          setError(true);
          setBuffering(false);
        }}
      >
        {captions.map((item) => (
          <track
            key={`${item.srcLang}-${item.src}`}
            kind="captions"
            src={item.src}
            srcLang={item.srcLang}
            label={item.label}
            default={item.default}
            onLoad={syncCaptions}
          />
        ))}
      </video>

      {buffering && !error && (
        <div
          role="status"
          aria-live="polite"
          className="pointer-events-none absolute inset-0 z-10
            flex items-center justify-center"
        >
          <span className="rounded bg-black/70 px-3 py-2 text-sm">
            Loading…
          </span>
        </div>
      )}

      {error && (
        <div
          role="alert"
          className="absolute inset-0 z-40 flex flex-col
            items-center justify-center gap-3 bg-black p-4"
        >
          <p>Unable to play this video.</p>

          <button
            type="button"
            className={buttonClass}
            onClick={retry}
          >
            Retry
          </button>
        </div>
      )}

      {/* SETTINGS */}
      {menu && !error && (
        <div
          aria-label="Playback settings"
          className="absolute bottom-16 right-2 z-30 max-h-[65%]
            w-52 overflow-y-auto rounded bg-zinc-900
            p-2 text-sm shadow-xl"
        >
          <div className="mb-2 flex items-center justify-between">
            <button
              type="button"
              className={buttonClass}
              onClick={() =>
                setMenu(menu === "main" ? null : "main")
              }
            >
              {menu === "main" ? "Settings" : "← Back"}
            </button>

            <button
              type="button"
              aria-label="Close settings"
              className={buttonClass}
              onClick={() => setMenu(null)}
            >
              ✕
            </button>
          </div>

          {menu === "main" && (
            <div className="grid gap-1 text-left">
              <button className={buttonClass} onClick={() => setMenu("speed")}>
                Speed · {speed}×
              </button>

              {captions.length > 0 && (
                <button className={buttonClass} onClick={() => setMenu("captions")}>
                  Captions · {caption}
                </button>
              )}

              {qualities.length > 0 && (
                <button className={buttonClass} onClick={() => setMenu("quality")}>
                  Quality · {quality || "Original"}
                </button>
              )}

              {languages.length > 0 && (
                <button className={buttonClass} onClick={() => setMenu("audio")}>
                  Audio · {audio || "Original"}
                </button>
              )}
            </div>
          )}

          {menu === "speed" && (
            <select
              aria-label="Playback speed"
              value={speed}
              onChange={(e) => changeSpeed(Number(e.target.value))}
              className="w-full rounded bg-zinc-800 p-2"
            >
              {PLAYBACK_SPEEDS.map((value) => (
                <option key={value} value={value}>
                  {value === 1 ? "Normal" : `${value}×`}
                </option>
              ))}
            </select>
          )}

          {menu === "captions" && (
            <select
              aria-label="Captions"
              value={caption}
              onChange={(e) => {
                setCaption(e.target.value);
                setMenu(null);
              }}
              className="w-full rounded bg-zinc-800 p-2"
            >
              <option value="off">Off</option>
              {captions.map((item) => (
                <option key={item.src} value={item.srcLang}>
                  {item.label}
                </option>
              ))}
            </select>
          )}

          {menu === "quality" && (
            <select
              aria-label="Video quality"
              value={quality}
              onChange={(e) => {
                const item = qualities.find(
                  (option) => option.label === e.target.value
                );
                if (item) switchSource(item.src, item.label, "quality");
              }}
              className="w-full rounded bg-zinc-800 p-2"
            >
              <option value="" disabled>Select quality</option>
              {qualities.map((item) => (
                <option key={item.label} value={item.label}>
                  {item.label}
                </option>
              ))}
            </select>
          )}

          {menu === "audio" && (
            <select
              aria-label="Audio language"
              value={audio}
              onChange={(e) => {
                const item = languages.find(
                  (option) => option.label === e.target.value
                );
                if (item) switchSource(item.src, item.label, "audio");
              }}
              className="w-full rounded bg-zinc-800 p-2"
            >
              <option value="" disabled>Select audio</option>
              {languages.map((item) => (
                <option key={item.label} value={item.label}>
                  {item.label}
                </option>
              ))}
            </select>
          )}
        </div>
      )}

      {/* ALWAYS-AVAILABLE BOTTOM TOOLBAR */}
      {!error && (
        <div
          role="group"
          aria-label="Video controls"
          className="absolute inset-x-0 bottom-0 z-20
            bg-gradient-to-t from-black via-black/80
            to-transparent px-2 pb-2 pt-8 sm:px-4 sm:pb-3"
        >
          <input
            type="range"
            aria-label="Video progress"
            aria-valuetext={`${formatTime(time)} of ${formatTime(duration)}`}
            min={0}
            max={duration || 1}
            step={5}
            value={Math.min(time, duration || 1)}
            disabled={!duration}
            onChange={(e) => seek(Number(e.target.value))}
            className="mb-2 block h-2 w-full cursor-pointer
              accent-red-600 disabled:opacity-50"
          />

          <div className="flex min-w-0 items-center gap-1 sm:gap-2">
            <button
              type="button"
              className={buttonClass}
              aria-label={playing ? "Pause" : "Play"}
              onClick={togglePlay}
            >
              {playing ? "❚❚" : "▶"}
            </button>

            <button
              type="button"
              className={buttonClass}
              aria-label={muted ? "Unmute" : "Mute"}
              onClick={toggleMute}
            >
              {muted || volume === 0 ? "🔇" : "🔊"}
            </button>

            <input
              type="range"
              aria-label="Volume"
              min={0}
              max={1}
              step={0.05}
              value={muted ? 0 : volume}
              onChange={(e) => changeVolume(Number(e.target.value))}
              className="w-12 min-w-0 cursor-pointer
                accent-white sm:w-20"
            />

            <span className="whitespace-nowrap text-[11px] tabular-nums sm:text-xs">
              {formatTime(time)} / {formatTime(duration)}
            </span>

            <div className="min-w-0 flex-1" />

            <button
              type="button"
              className={buttonClass}
              aria-label="Settings"
              aria-expanded={menu !== null}
              onClick={() => setMenu(menu ? null : "main")}
            >
              ⚙
            </button>

            <button
              type="button"
              className={buttonClass}
              aria-label={fullscreen ? "Exit fullscreen" : "Enter fullscreen"}
              onClick={toggleFullscreen}
            >
              ⛶
            </button>
          </div>
        </div>
      )}
    </section>
  );
}