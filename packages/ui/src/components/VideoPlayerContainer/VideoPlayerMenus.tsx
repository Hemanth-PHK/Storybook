import {
  SPEEDS,
  type MenuType,
  type VideoCaption,
  type VideoLanguage,
  type VideoQuality,
} from "./VideoPlayerUtils";

interface SettingsMenuProps {
  menu: MenuType;
  playbackRate: number;
  selectedQuality: string;
  selectedLanguage: string;
  selectedCaption: string | "off";

  qualities: VideoQuality[];
  languages: VideoLanguage[];
  captions: VideoCaption[];

  onMenuChange: (menu: MenuType) => void;
  onSpeedChange: (value: number) => void;
  onQualityChange: (value: string) => void;
  onLanguageChange: (value: string) => void;
  onCaptionChange: (value: string | "off") => void;
}

export function SettingsMenu({
  menu,
  playbackRate,
  selectedQuality,
  selectedLanguage,
  selectedCaption,
  qualities,
  languages,
  captions,
  onMenuChange,
  onSpeedChange,
  onQualityChange,
  onLanguageChange,
  onCaptionChange,
}: SettingsMenuProps) {
  return (
    <div
      role="menu"
      className="absolute bottom-14 right-3 z-40 w-64 rounded-md bg-[#1f1f1f] text-sm text-white shadow-lg"
      onClick={(event) => {
        event.stopPropagation();
      }}
    >
      {menu === "main" && (
        <>
          <MenuRow
            label="Playback speed"
            value={
              playbackRate === 1
                ? "Normal"
                : `${playbackRate}x`
            }
            onClick={() => {
              onMenuChange("speed");
            }}
          />

          {qualities.length > 0 && (
            <MenuRow
              label="Quality"
              value={selectedQuality || "Auto"}
              onClick={() => {
                onMenuChange("quality");
              }}
            />
          )}

          {languages.length > 0 && (
            <MenuRow
              label="Language"
              value={selectedLanguage || "Default"}
              onClick={() => {
                onMenuChange("language");
              }}
            />
          )}

          {captions.length > 0 && (
            <MenuRow
              label="Captions"
              value={
                selectedCaption === "off"
                  ? "Off"
                  : selectedCaption
              }
              onClick={() => {
                onMenuChange("captions");
              }}
            />
          )}
        </>
      )}

      {menu === "speed" && (
        <OptionMenu
          title="Playback speed"
          options={SPEEDS.map((value) => ({
            label:
              value === 1
                ? "Normal"
                : `${value}x`,
            value,
            active: playbackRate === value,
          }))}
          onBack={() => {
            onMenuChange("main");
          }}
          onSelect={onSpeedChange}
        />
      )}

      {menu === "quality" && (
        <OptionMenu
          title="Quality"
          options={qualities.map((item) => ({
            label: item.label,
            value: item.label,
            active: selectedQuality === item.label,
          }))}
          onBack={() => {
            onMenuChange("main");
          }}
          onSelect={onQualityChange}
        />
      )}

      {menu === "language" && (
        <OptionMenu
          title="Language"
          options={languages.map((item) => ({
            label: item.label,
            value: item.label,
            active:
              selectedLanguage === item.label,
          }))}
          onBack={() => {
            onMenuChange("main");
          }}
          onSelect={onLanguageChange}
        />
      )}

      {menu === "captions" && (
        <OptionMenu
          title="Captions"
          options={[
            ...captions.map((caption) => ({
              label: caption.label,
              value: caption.srcLang,
              active:
                selectedCaption === caption.srcLang,
            })),
            {
              label: "Off",
              value: "off" as const,
              active: selectedCaption === "off",
            },
          ]}
          onBack={() => {
            onMenuChange("main");
          }}
          onSelect={onCaptionChange}
        />
      )}
    </div>
  );
}

interface MenuRowProps {
  label: string;
  value: string;
  onClick: () => void;
}

function MenuRow({
  label,
  value,
  onClick,
}: MenuRowProps) {
  return (
    <button
      type="button"
      role="menuitem"
      onClick={onClick}
      className="flex w-full items-center justify-between px-4 py-3 text-left hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
    >
      <span>{label}</span>

      <span className="opacity-80">
        {value}
      </span>
    </button>
  );
}

interface Option {
  label: string;
  value: any;
  active: boolean;
}

interface OptionMenuProps {
  title: string;
  options: Option[];
  onBack: () => void;
  onSelect: (value: any) => void;
}

function OptionMenu({
  title,
  options,
  onBack,
  onSelect,
}: OptionMenuProps) {
  return (
    <>
      <div className="flex items-center gap-2 border-b border-white/10 px-3 py-2">
        <button
          type="button"
          aria-label="Back"
          onClick={onBack}
          className="rounded px-2 py-1 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white"
        >
          ←
        </button>

        <span className="font-medium">
          {title}
        </span>
      </div>

      {options.map((option) => (
        <button
          key={`${option.label}-${String(option.value)}`}
          type="button"
          role="menuitemradio"
          aria-checked={option.active}
          onClick={() => {
            onSelect(option.value);
          }}
          className="flex w-full items-center justify-between px-4 py-3 text-left hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
        >
          <span>{option.label}</span>

          {option.active && (
            <span aria-hidden="true">
              ✔
            </span>
          )}
        </button>
      ))}
    </>
  );
}