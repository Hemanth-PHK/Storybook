import { forwardRef, useState } from "react";
import { cn } from "../../utils/cn";

export interface AvatarProps {
  src?: string;
  alt: string;
  name: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  sm: "h-8 w-8 text-xs",
  md: "h-12 w-12 text-base",
  lg: "h-16 w-16 text-xl",
};

function getInitials(name: string): string {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return "";
  const first = Array.from(words[0])[0];
  const last = words.length > 1 ? Array.from(words[words.length - 1])[0] : "";
  return `${first}${last}`.toUpperCase();
}

function AvatarContent({ src, alt, name }: Pick<AvatarProps, "src" | "alt" | "name">) {
  const [failed, setFailed] = useState(false);

  if (src && !failed) {
    return (
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover"
        onError={() => setFailed(true)}
      />
    );
  }

  return (
    <span role={alt ? "img" : undefined} aria-label={alt || undefined} aria-hidden={alt ? undefined : true}>
      {getInitials(name)}
    </span>
  );
}

export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(function Avatar(
  { src, alt, name, size = "md", className },
  ref,
) {
  return (
    <span
      ref={ref}
      className={cn(
        "inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full",
        "border border-border bg-surface-hover font-semibold text-text",
        sizeClasses[size],
        className,
      )}
    >
      {/* A new source remounts the image so a previous failure can be retried. */}
      <AvatarContent key={src || ""} src={src} alt={alt} name={name} />
    </span>
  );
});
