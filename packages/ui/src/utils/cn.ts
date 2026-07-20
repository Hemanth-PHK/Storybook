/* Tiny helper to join class names conditionally. Keeps component JSX clean.
   (In a bigger setup you'd use `clsx` + `tailwind-merge`; this avoids deps.) */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}
