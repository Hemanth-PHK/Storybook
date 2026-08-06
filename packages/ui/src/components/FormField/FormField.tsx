import type { ReactNode } from "react";
import { cloneElement, isValidElement } from "react";

/* ============================================================================
   FormField — REUSABLE COMPONENT
   ----------------------------------------------------------------------------
   Wraps form controls like Input.
   1. Label
   2. Required indicator
   3. Helper text
   4. Error message
   5. Accessible label/input association
============================================================================ */

export interface FormFieldProps {
  id?: string;
  label?: string;
  required?: boolean;
  helperText?: string;
  error?: string;
  children: ReactNode;
}

export function FormField({
  id,
  label,
  required,
  helperText,
  error,
  children,
}: FormFieldProps) {
  const helperId = helperText ? `${id}-helper` : undefined;
  const errorId = error ? `${id}-error` : undefined;

  const child = isValidElement(children)
    ? cloneElement(children as React.ReactElement<any>, {
        id,
        required,
        "aria-invalid": !!error,
        "aria-describedby": error ? errorId : helperId,
      })
    : children;

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label
          htmlFor={id}
          className="text-sm font-medium text-text"
        >
          {label}
          {required && (
            <span className="ml-1 text-danger">*</span>
          )}
        </label>
      )}

      {child}

      {error ? (
        <p
          id={errorId}
          className="text-sm text-danger"
        >
          {error}
        </p>
      ) : (
        helperText && (
          <p
            id={helperId}
            className="text-sm text-muted"
          >
            {helperText}
          </p>
        )
      )}
    </div>
  );
}