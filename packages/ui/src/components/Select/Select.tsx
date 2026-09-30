
import { useState } from "react";
import ReactSelect, {
  type StylesConfig,
} from "react-select";

import { cn } from "../../utils/cn";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps {
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  invalid?: boolean;
  id?: string;
  className?: string;
  name?: string;
  required?: boolean;
  "aria-describedby"?: string;
}

const selectStyles: StylesConfig<SelectOption, false> = {
  container: (base) => ({
    ...base,
    width: "100%",
    minWidth: 0,
    maxWidth: "100%",
  }),

  control: (base) => ({
    ...base,
    minWidth: 0,
    maxWidth: "100%",
  }),

  valueContainer: (base) => ({
    ...base,
    minWidth: 0,
    overflow: "hidden",
  }),

  singleValue: (base) => ({
    ...base,
    maxWidth: "100%",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  }),

  menu: (base) => ({
    ...base,
    width: "100%",
    maxWidth: "100%",
    zIndex: 50,
  }),

  menuList: (base) => ({
    ...base,
    overflowX: "hidden",
  }),

  option: (base) => ({
    ...base,
    whiteSpace: "normal",
    overflowWrap: "anywhere",
    wordBreak: "break-word",
  }),
};

export function Select({
  options,
  value,
  defaultValue = "",
  onChange,
  placeholder = "Select an option",
  disabled = false,
  invalid = false,
  id,
  className,
  name,
  required,
  "aria-describedby": describedBy,
}: SelectProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);

  const selectedValue =
    value !== undefined ? value : internalValue;

  const selectedOption =
    options.find((option) => option.value === selectedValue) ??
    null;

  return (
    <ReactSelect<SelectOption, false>
      inputId={id}
      instanceId={id}
      name={name}
      options={options}
      value={selectedOption}
      onChange={(option) => {
        const nextValue = option?.value ?? "";

        if (value === undefined) {
          setInternalValue(nextValue);
        }

        onChange?.(nextValue);
      }}
      placeholder={placeholder}
      isDisabled={disabled}
      isOptionDisabled={(option) => Boolean(option.disabled)}
      isSearchable={false}
      isClearable={false}
      required={required}
      aria-invalid={invalid || undefined}
      aria-describedby={describedBy}
      menuPlacement="auto"
      menuPosition="fixed"
      maxMenuHeight={240}
      unstyled
      styles={selectStyles}
      className={cn("w-full min-w-0 max-w-full", className)}
      classNames={{
        control: (state) =>
          cn(
            "min-h-11 rounded-lg border bg-surface",
            "px-3 text-sm text-text",
            "transition-colors",
            state.isFocused
              ? "ring-2 ring-primary/20"
              : "",
            invalid
              ? "border-danger"
              : state.isFocused
                ? "border-primary"
                : "border-border",
            state.isDisabled &&
              "cursor-not-allowed opacity-50",
          ),

        valueContainer: () =>
          "min-w-0 overflow-hidden py-2",

        singleValue: () =>
          "block min-w-0 truncate text-sm text-text",

        placeholder: () =>
          "truncate text-sm text-muted",

        dropdownIndicator: () =>
          "flex items-center justify-center text-muted",

        indicatorSeparator: () => "hidden",

        menu: () =>
          "overflow-hidden rounded-lg border border-border bg-surface shadow-lg",

        menuList: () =>
          "overflow-x-hidden p-1",

        option: (state) =>
          cn(
            "cursor-pointer rounded-md px-3 py-2.5",
            "text-sm leading-5 text-text",
            "whitespace-normal [overflow-wrap:anywhere]",
            state.isFocused && "bg-primary/10",
            state.isSelected && "bg-primary/10 font-medium",
            state.isDisabled &&
              "cursor-not-allowed opacity-50",
          ),

        noOptionsMessage: () =>
          "px-3 py-2 text-sm text-muted",
      }}
    />
  );
}
