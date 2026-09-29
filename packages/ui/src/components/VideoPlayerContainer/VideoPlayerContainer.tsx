import React, {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  formatTime,
  type MenuType,
  type VideoLanguage,
  type VideoPlayerContainerProps,
  type VideoQuality,
} from "./VideoPlayerUtils";

import {
  ControlButton,
  ProgressBar,
  SeekFeedback,
} from "./VideoPlayerControls";

import { SettingsMenu } from "./VideoPlayerMenus";

export const VideoPlayerContainer = ({
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
}: VideoPlayerContainerProps) => {
  const videoRef =
    useRef<HTMLVideoElement>(null);

  const containerRef =
    useRef<HTMLDivElement>(null);

  const resumeCalledRef =
    useRef(false);

  const feedbackTimerRef =
    useRef<number | null>(null);

  const [playing, setPlaying] =
    useState(false);

  const [muted, setMuted] =
    useState(false);

  const [currentTime, setCurrentTime] =
    useState(0);

  const [duration, setDuration] =
    useState(0);

  const [playbackRate, setPlaybackRate] =
    useState(1);

  const [selectedQuality, setSelectedQuality] =
    useState("");

  const [selectedLanguage, setSelectedLanguage] =
    useState("");

  const [selectedCaption, setSelectedCaption] =
    useState<string | "off">("off");

  const [openMenu, setOpenMenu] =
    useState<MenuType>(null);

  const [isFullscreen, setIsFullscreen] =
    useState(false);

  const [seekFeedback, setSeekFeedback] =
    useState<"rewind" | "forward" | null>(
      null
    );

  useEffect(() => {
    resumeCalledRef.current = false;

    setPlaying(false);
    setMuted(false);
    setCurrentTime(0);
    setDuration(0);
    setPlaybackRate(1);
    setSelectedQuality("");
    setSelectedLanguage("");
    setSelectedCaption("off");
    setOpenMenu(null);
  }, [src]);

 
  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    const handleLoadedMetadata = () => {
      if (!Number.isFinite(video.duration)) {
        return;
      }

      setDuration(video.duration);

      if (
        initialPosition > 0 &&
        initialPosition < video.duration
      ) {
        video.currentTime =
          initialPosition;

        setCurrentTime(
          initialPosition
        );
      }
    };

    const handleTimeUpdate = () => {
      const time = video.currentTime;

      setCurrentTime(time);

      if (Number.isFinite(video.duration)) {
        setDuration(video.duration);

        onProgress?.(
          time,
          video.duration
        );
      }
    };

    const handlePlay = () => {
      setPlaying(true);

      if (!resumeCalledRef.current) {
        resumeCalledRef.current = true;

        onResume?.(
          video.currentTime
        );
      }
    };

    const handlePause = () => {
      setPlaying(false);
    };

    const handleEnded = () => {
      setPlaying(false);

      onComplete?.();
    };

    const handleVolumeChange = () => {
      setMuted(video.muted);
    };

    video.addEventListener(
      "loadedmetadata",
      handleLoadedMetadata
    );

    video.addEventListener(
      "timeupdate",
      handleTimeUpdate
    );

    video.addEventListener(
      "play",
      handlePlay
    );

    video.addEventListener(
      "pause",
      handlePause
    );

    video.addEventListener(
      "ended",
      handleEnded
    );

    video.addEventListener(
      "volumechange",
      handleVolumeChange
    );

    return () => {
      video.removeEventListener(
        "loadedmetadata",
        handleLoadedMetadata
      );

      video.removeEventListener(
        "timeupdate",
        handleTimeUpdate
      );

      video.removeEventListener(
        "play",
        handlePlay
      );

      video.removeEventListener(
        "pause",
        handlePause
      );

      video.removeEventListener(
        "ended",
        handleEnded
      );

      video.removeEventListener(
        "volumechange",
        handleVolumeChange
      );
    };
  }, [
    initialPosition,
    onProgress,
    onResume,
    onComplete,
  ]);

  /*
   * Fullscreen state
   */
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(
        document.fullscreenElement ===
          containerRef.current
      );
    };

    document.addEventListener(
      "fullscreenchange",
      handleFullscreenChange
    );

    return () => {
      document.removeEventListener(
        "fullscreenchange",
        handleFullscreenChange
      );
    };
  }, []);

  
  useEffect(() => {
    return () => {
      if (feedbackTimerRef.current) {
        window.clearTimeout(
          feedbackTimerRef.current
        );
      }
    };
  }, []);

  /*
   * Play / Pause
   */
  const togglePlay = async () => {
    const video = videoRef.current;

    if (!video) return;

    try {
      if (video.paused) {
        await video.play();
      } else {
        video.pause();
      }
    } catch {
      setPlaying(false);
    }
  };

  /*
   * Mute / Unmute
   */
  const toggleMute = () => {
    const video = videoRef.current;

    if (!video) return;

    video.muted = !video.muted;

    setMuted(video.muted);
  };

  /*
   * Seek
   */
  const seekTo = (time: number) => {
    const video = videoRef.current;

    if (
      !video ||
      !Number.isFinite(video.duration)
    ) {
      return;
    }

    const nextTime = Math.min(
      video.duration,
      Math.max(0, time)
    );

    video.currentTime = nextTime;

    setCurrentTime(nextTime);
  };

  /*
   * Progress bar click
   */
  const handleSeek = (
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    if (!duration) return;

    const rect =
      event.currentTarget.getBoundingClientRect();

    const percentage = Math.min(
      1,
      Math.max(
        0,
        (event.clientX - rect.left) /
          rect.width
      )
    );

    seekTo(
      percentage * duration
    );
  };

  /*
   * Keyboard progress control
   */
  const handleProgressKeyDown = (
    event: React.KeyboardEvent<HTMLDivElement>
  ) => {
    if (!duration) return;

    switch (event.key) {
      case "ArrowRight":
        event.preventDefault();

        seekTo(
          currentTime + 5
        );

        break;

      case "ArrowLeft":
        event.preventDefault();

        seekTo(
          currentTime - 5
        );

        break;

      case "Home":
        event.preventDefault();

        seekTo(0);

        break;

      case "End":
        event.preventDefault();

        seekTo(duration);

        break;
    }
  };

  /*
   * Seek feedback
   */
  const showSeekFeedback = (
    type: "rewind" | "forward"
  ) => {
    setSeekFeedback(type);

    if (feedbackTimerRef.current) {
      window.clearTimeout(
        feedbackTimerRef.current
      );
    }

    feedbackTimerRef.current =
      window.setTimeout(() => {
        setSeekFeedback(null);
      }, 700);
  };

  /*
   * Double click:
   * left = rewind 10 seconds
   * right = forward 10 seconds
   */
  const handleDoubleClick = (
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    const rect =
      event.currentTarget.getBoundingClientRect();

    const clickX =
      event.clientX - rect.left;

    if (
      clickX <
      rect.width / 3
    ) {
      seekTo(
        currentTime - 10
      );

      showSeekFeedback(
        "rewind"
      );
    } else if (
      clickX >
      (rect.width * 2) / 3
    ) {
      seekTo(
        currentTime + 10
      );

      showSeekFeedback(
        "forward"
      );
    }
  };

  /*
   * Video click:
   * center area = play / pause
   */
  const handleVideoClick = (
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    const rect =
      event.currentTarget.getBoundingClientRect();

    const clickX =
      event.clientX - rect.left;

    if (
      clickX > rect.width / 3 &&
      clickX <
        (rect.width * 2) / 3
    ) {
      void togglePlay();
    }
  };

  /*
   * Fullscreen
   */
  const toggleFullscreen = async () => {
    const container =
      containerRef.current;

    if (!container) return;

    try {
      if (!document.fullscreenElement) {
        await container.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch {
      // Browser may block fullscreen.
    }
  };

  /*
   * Playback speed
   */
  const changeSpeed = (
    value: number
  ) => {
    const video = videoRef.current;

    if (!video) return;

    video.playbackRate = value;

    setPlaybackRate(value);

    setOpenMenu("main");
  };

  /*
   * Quality / language source change
   */
  const changeSource = (
    value: string,
    items:
      | VideoQuality[]
      | VideoLanguage[],
    setValue: (
      value: string
    ) => void
  ) => {
    const video = videoRef.current;

    const item = items.find(
      (entry) =>
        entry.label === value
    );

    if (!video || !item) {
      return;
    }

    const savedTime =
      video.currentTime;

    const wasPlaying =
      !video.paused;

    setValue(value);

    video.src = item.src;

    const restorePlayback = () => {
      if (
        Number.isFinite(
          video.duration
        )
      ) {
        video.currentTime =
          Math.min(
            savedTime,
            video.duration
          );
      }

      if (wasPlaying) {
        void video.play();
      }
    };

    video.addEventListener(
      "loadedmetadata",
      restorePlayback,
      {
        once: true,
      }
    );

    video.load();

    setOpenMenu("main");
  };

  /*
   * Captions
   */
  const changeCaption = (
    language: string | "off"
  ) => {
    const video = videoRef.current;

    if (!video) return;

    Array.from(
      video.textTracks
    ).forEach((track) => {
      track.mode =
        language === "off"
          ? "disabled"
          : track.language ===
              language
            ? "showing"
            : "disabled";
    });

    setSelectedCaption(
      language
    );

    setOpenMenu("main");
  };

  const progress =
    duration > 0
      ? Math.min(
          100,
          Math.max(
            0,
            (currentTime /
              duration) *
              100
          )
        )
      : 0;

  /*
   * Unavailable state
   */
  if (unavailable) {
    return (
      <div
        role="status"
        aria-label={`${title} unavailable`}
        className={`flex aspect-video w-full items-center justify-center rounded-lg border border-border bg-muted p-6 text-center ${className}`}
      >
        <div>
          <h2 className="text-lg font-semibold text-text">
            Video unavailable
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            This video is currently unavailable.
          </p>
        </div>
      </div>
    );
  }

  return (
    <section
      ref={containerRef}
      aria-label={title}
      className={`relative w-full overflow-hidden rounded-lg bg-black ${className}`}
    >
      <div
        className="relative aspect-video w-full bg-black"
        onClick={handleVideoClick}
        onDoubleClick={handleDoubleClick}
      >
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          playsInline
          preload="metadata"
          aria-label={title}
          className="h-full w-full cursor-pointer object-contain"
        >
          {captions.map(
            (caption) => (
              <track
                key={`${caption.srcLang}-${caption.label}`}
                kind="captions"
                src={caption.src}
                srcLang={
                  caption.srcLang
                }
                label={
                  caption.label
                }
                default={
                  caption.default
                }
              />
            )
          )}

          Your browser does not
          support the video element.
        </video>

        {seekFeedback ===
          "rewind" && (
          <SeekFeedback
            side="left"
            text="« 10"
          />
        )}

        {seekFeedback ===
          "forward" && (
          <SeekFeedback
            side="right"
            text="10 »"
          />
        )}

        <ProgressBar
          duration={duration}
          currentTime={currentTime}
          progress={progress}
          onSeek={handleSeek}
          onKeyDown={
            handleProgressKeyDown
          }
        />

        <div
          className="absolute bottom-0 left-0 right-0 z-30 flex h-12 items-center gap-2 bg-black/80 px-3 text-white"
          onClick={(event) => {
            event.stopPropagation();
          }}
        >
          <ControlButton
            label={
              playing
                ? "Pause video"
                : "Play video"
            }
            onClick={() => {
              void togglePlay();
            }}
          >
            {playing
              ? "❚❚"
              : "▶"}
          </ControlButton>

          <ControlButton
            label={
              muted
                ? "Unmute video"
                : "Mute video"
            }
            onClick={
              toggleMute
            }
          >
            {muted
              ? "🔇"
              : "🔊"}
          </ControlButton>

          <span
            aria-label="Video time"
            className="min-w-[100px] text-sm"
          >
            {formatTime(
              currentTime
            )}{" "}
            /{" "}
            {formatTime(
              duration
            )}
          </span>

          <div className="flex-1" />

          {captions.length >
            0 && (
            <ControlButton
              label="Captions"
              expanded={
                openMenu ===
                "captions"
              }
              onClick={() => {
                setOpenMenu(
                  openMenu ===
                    "captions"
                    ? null
                    : "captions"
                );
              }}
            >
              CC
            </ControlButton>
          )}

          <ControlButton
            label="Player settings"
            expanded={
              openMenu === "main"
            }
            onClick={() => {
              setOpenMenu(
                openMenu ===
                  "main"
                  ? null
                  : "main"
              );
            }}
          >
            ⚙
          </ControlButton>

          {qualities.length >
            0 && (
            <ControlButton
              label="Video quality"
              onClick={() => {
                setOpenMenu(
                  openMenu ===
                    "quality"
                    ? null
                    : "quality"
                );
              }}
            >
              HD
            </ControlButton>
          )}

          <ControlButton
            label={
              isFullscreen
                ? "Exit fullscreen"
                : "Enter fullscreen"
            }
            onClick={() => {
              void toggleFullscreen();
            }}
          >
            {isFullscreen
              ? "🡼"
              : "⛶"}
          </ControlButton>
        </div>

        {openMenu && (
          <SettingsMenu
            menu={openMenu}
            playbackRate={
              playbackRate
            }
            selectedQuality={
              selectedQuality
            }
            selectedLanguage={
              selectedLanguage
            }
            selectedCaption={
              selectedCaption
            }
            qualities={
              qualities
            }
            languages={
              languages
            }
            captions={
              captions
            }
            onMenuChange={
              setOpenMenu
            }
            onSpeedChange={
              changeSpeed
            }
            onQualityChange={(
              value
            ) => {
              changeSource(
                value,
                qualities,
                setSelectedQuality
              );
            }}
            onLanguageChange={(
              value
            ) => {
              changeSource(
                value,
                languages,
                setSelectedLanguage
              );
            }}
            onCaptionChange={
              changeCaption
            }
          />
        )}
      </div>
    </section>
  );
};

VideoPlayerContainer.displayName =
  "VideoPlayerContainer";