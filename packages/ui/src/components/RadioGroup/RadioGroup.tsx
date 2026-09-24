import {
  useId,
  useState,
  type ChangeEvent,
  type HTMLAttributes,
} from "react";

import { cn } from "../../utils/cn";

export interface RadioOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface RadioGroupProps
  extends Omit<HTMLAttributes<HTMLFieldSetElement>, "onChange"> {
  name: string;
  options: RadioOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  orientation?: "vertical" | "horizontal";
  disabled?: boolean;
  invalid?: boolean;
}

export function RadioGroup({
  name,
  options,
  value,
  defaultValue,
  onValueChange,
  orientation = "vertical",
  disabled = false,
  invalid = false,
  className,
  ...props
}: RadioGroupProps) {
  const generatedId = useId();

  const [internalValue, setInternalValue] = useState(
    defaultValue ?? "",
  );

  const isControlled = value !== undefined;
  const selectedValue = isControlled ? value : internalValue;

  const handleChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const newValue = event.target.value;

    if (!isControlled) {
      setInternalValue(newValue);
    }

    onValueChange?.(newValue);
  };

  return (
    <fieldset
      className={cn("w-full border-0 p-0", className)}
      aria-invalid={invalid}
      {...props}
    >
      <legend className="sr-only">{name}</legend>

      <div
        className={cn(
          "flex gap-4",
          orientation === "vertical"
            ? "flex-col"
            : "flex-row flex-wrap",
        )}
      >
        {options.map((option) => {
          const inputId = `${generatedId}-${option.value}`;
          const isDisabled = disabled || option.disabled;
          const isSelected = selectedValue === option.value;

          return (
            <label
              key={option.value}
              htmlFor={inputId}
              className={cn(
                "flex items-center gap-3",
                isDisabled
                  ? "cursor-not-allowed opacity-50"
                  : "cursor-pointer",
              )}
            >
              <input
                id={inputId}
                type="radio"
                name={name}
                value={option.value}
                checked={isSelected}
                disabled={isDisabled}
                onChange={handleChange}
                aria-invalid={invalid}
                className="peer sr-only"
              />

              <span
                aria-hidden="true"
                className={cn(
                  "relative flex h-5 w-5 shrink-0",
                  "items-center justify-center",
                  "rounded-full border-2",
                  "transition-colors duration-150",

                  invalid
                    ? "border-danger"
                    : "border-muted",

                  "peer-focus-visible:ring-2",
                  invalid
                    ? "peer-focus-visible:ring-danger"
                    : "peer-focus-visible:ring-primary",
                  "peer-focus-visible:ring-offset-2",

                  isSelected &&
                    (invalid
                      ? "border-danger"
                      : "border-primary"),
                )}
              >
                <span
                  className={cn(
                    "h-2.5 w-2.5 rounded-full",
                    "scale-0 transition-transform duration-150",
                    isSelected &&
                      "scale-100",
                    invalid
                      ? "bg-danger"
                      : "bg-primary",
                  )}
                />
              </span>

              <span className="text-text">
                {option.label}
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}