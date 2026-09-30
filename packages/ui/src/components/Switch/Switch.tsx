import {
  forwardRef,
  useState,
  type ChangeEvent,
  type InputHTMLAttributes,
} from "react";

import { cn } from "../../utils/cn";

export interface SwitchProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string;
  invalid?: boolean;
}

export const Switch = forwardRef<
  HTMLInputElement,
  SwitchProps
>(function Switch(
  {
    label,
    invalid = false,
    disabled,
    checked,
    defaultChecked = false,
    onChange,
    className,
    ...props
  },
  ref,
) {
  const isControlled = checked !== undefined;

  const [internalChecked, setInternalChecked] =
    useState(defaultChecked);

  const currentChecked = isControlled
    ? checked
    : internalChecked;

  const handleChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    if (!isControlled) {
      setInternalChecked(event.target.checked);
    }

    onChange?.(event);
  };

  return (
    <label
      className={cn(
        "inline-flex items-center gap-3",
        disabled
          ? "cursor-not-allowed opacity-50"
          : "cursor-pointer",
        className,
      )}
    >
      <input
        ref={ref}
        type="checkbox"
        role="switch"
        disabled={disabled}
        checked={isControlled ? checked : undefined}
        defaultChecked={
          isControlled ? undefined : defaultChecked
        }
        onChange={handleChange}
        aria-checked={currentChecked}
        aria-invalid={invalid}
        className="peer sr-only"
        {...props}
      />

      <span
        aria-hidden="true"
        className={cn(
          "relative h-6 w-11 rounded-full",
          "bg-border",
          "transition-colors duration-200",

          "peer-checked:bg-primary",

          invalid &&
            "ring-2 ring-danger",

          "peer-focus-visible:outline-none",
          "peer-focus-visible:ring-2",
          "peer-focus-visible:ring-offset-2",

          invalid
            ? "peer-focus-visible:ring-danger"
            : "peer-focus-visible:ring-primary",

          "after:absolute",
          "after:left-1",
          "after:top-1",
          "after:h-4",
          "after:w-4",
          "after:rounded-full",
          "after:bg-white",
          "after:transition-transform",

          "peer-checked:after:translate-x-5",
        )}
      />

      <span
        className={cn(
          "text-text",
          invalid && "text-danger",
        )}
      >
        {label}
      </span>
    </label>
  );
});