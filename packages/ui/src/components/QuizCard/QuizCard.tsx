import { useId, type ReactNode } from "react";

import { cn } from "../../utils/cn";

export interface QuizOption {
  id: string;
  label: ReactNode;
  disabled?: boolean;
}

export interface QuizCardProps {
  question: ReactNode;
  options: QuizOption[];
  selectedOptionId?: string;
  onOptionChange: (optionId: string) => void;
  validationMessage?: string;
  feedback?: ReactNode;
  /** Presentation only: supplied by the assessment owner, never scored here. */
  answerStatus?: "correct" | "incorrect";
  explanation?: ReactNode;
  nextAction?: ReactNode;
  disabled?: boolean;
  className?: string;
}

export function QuizCard({
  question,
  options,
  selectedOptionId,
  onOptionChange,
  validationMessage,
  feedback,
  answerStatus,
  explanation,
  nextAction,
  disabled = false,
  className,
}: QuizCardProps) {
  const id = useId();
  const validationId = `${id}-validation`;

  return (
    <div className={cn("rounded-lg border border-border bg-surface min-w-0 [overflow-wrap:anywhere] p-4 sm:p-6 text-text", className)}>
      <fieldset className="min-w-0" disabled={disabled} aria-describedby={validationMessage ? validationId : undefined}>
        <legend className="mb-4 max-w-full text-lg font-semibold">{question}</legend>
        <div className="space-y-2">
          {options.map((option) => (
            <label
              key={option.id}
              className={cn(
                "flex cursor-pointer items-center gap-3 rounded-md border border-border p-3",
                "focus-within:ring-2 focus-within:ring-primary",
                !answerStatus && "has-[:checked]:border-primary has-[:checked]:bg-bg",
                selectedOptionId === option.id && answerStatus === "incorrect" && "border-danger bg-bg",
                selectedOptionId === option.id && answerStatus === "correct" && "border-success bg-bg",
                (disabled || option.disabled) && "cursor-not-allowed",
                (option.disabled || (disabled && !answerStatus)) && "opacity-50",
              )}
            >
              <input
                type="radio"
                name={id}
                value={option.id}
                checked={selectedOptionId === option.id}
                onChange={() => onOptionChange(option.id)}
                disabled={option.disabled}
                aria-invalid={validationMessage || (selectedOptionId === option.id && answerStatus === "incorrect") ? true : undefined}
                aria-describedby={validationMessage ? validationId : undefined}
                className="shrink-0 accent-primary"
              />
              <span className="min-w-0">{option.label}
                {selectedOptionId === option.id && answerStatus && <span className={cn("ml-2 text-sm font-semibold", answerStatus === "correct" ? "text-success" : "text-danger")}>{answerStatus === "correct" ? "Correct" : "Incorrect"}</span>}
              </span>
            </label>
          ))}
        </div>
      </fieldset>
      {validationMessage && (
        <p id={validationId} className="mt-3 text-sm text-danger" role="alert">
          {validationMessage}
        </p>
      )}
      {feedback != null && <div className={cn("mt-4 text-sm", answerStatus === "correct" && "text-success", answerStatus === "incorrect" && "text-danger")} role="status">{feedback}</div>}
      {explanation != null && <div className="mt-4 text-sm text-muted">{explanation}</div>}
      {nextAction != null && <div className="mt-5">{nextAction}</div>}
    </div>
  );
}
