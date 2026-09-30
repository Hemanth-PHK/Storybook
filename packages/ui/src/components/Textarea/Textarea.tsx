import {
  forwardRef,
  useId,
  useState,
  type TextareaHTMLAttributes,
} from "react";

import { cn } from "../../utils/cn";

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean;
  showCount?: boolean;
}

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  TextareaProps
>(function Textarea(
  {
    className,
    disabled,
    invalid = false,
    showCount = false,
    maxLength,
    value,
    defaultValue,
    onChange,
    "aria-describedby": ariaDescribedBy,
    ...props
  },
  ref,
) {
  const countId = useId();

  const [uncontrolledValue, setUncontrolledValue] = useState(
    String(defaultValue ?? ""),
  );

  const isControlled = value !== undefined;

  const currentValue = isControlled
    ? String(value ?? "")
    : uncontrolledValue;

  const shouldShowCount =
    showCount && maxLength !== undefined;

  const handleChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    if (!isControlled) {
      setUncontrolledValue(event.target.value);
    }

    onChange?.(event);
  };

  return (
    <div className="w-full">
      <textarea
        ref={ref}
        disabled={disabled}
        value={value}
        defaultValue={defaultValue}
        maxLength={maxLength}
        aria-invalid={invalid}
        aria-describedby={
          cn(
            ariaDescribedBy,
            shouldShowCount && countId,
          ) || undefined
        }
        onChange={handleChange}
        className={cn(
          "w-full rounded-lg",
          "bg-surface text-text",
          "px-4 py-2",
          "placeholder:text-muted",
          "focus-visible:outline-none",
          "focus-visible:ring-2",
          "focus-visible:ring-offset-2",
          invalid
            ? "border border-danger focus-visible:ring-danger"
            : "border border-border focus-visible:ring-primary",
          "disabled:cursor-not-allowed",
          "disabled:opacity-50",
          className,
        )}
        {...props}
      />

      {shouldShowCount && (
        <p
          id={countId}
          className="mt-1 text-right text-sm text-muted"
          aria-live="polite"
        >
          {currentValue.length}/{maxLength}
        </p>
      )}
    </div>
  );
});