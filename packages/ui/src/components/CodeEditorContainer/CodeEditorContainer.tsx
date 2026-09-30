import {
  forwardRef,
  type ChangeEvent,
  type ReactNode,
  type TextareaHTMLAttributes,
} from "react";

import { Button } from "../Button";
import { cn } from "../../utils/cn";

export interface CodeEditorContainerProps
  extends Omit<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    "value" | "onChange" | "readOnly"
  > {
  value: string;
  onChange: (value: string) => void;

  language: string;
  languages: string[];
  onLanguageChange: (language: string) => void;

  onRun: () => void;
  onSubmit: () => void;

  running?: boolean;
  submitting?: boolean;
  readOnly?: boolean;

  consoleContent?: ReactNode;
  testCases?: ReactNode;
  verdict?: ReactNode;

  className?: string;
}

export const CodeEditorContainer = forwardRef<
  HTMLTextAreaElement,
  CodeEditorContainerProps
>(function CodeEditorContainer(
  {
    value,
    onChange,
    language,
    languages,
    onLanguageChange,
    onRun,
    onSubmit,
    running = false,
    submitting = false,
    readOnly = false,
    consoleContent,
    testCases,
    verdict,
    className,
    ...textareaProps
  },
  ref,
) {
  const handleCodeChange = (
    event: ChangeEvent<HTMLTextAreaElement>,
  ) => {
    onChange(event.target.value);
  };

  const actionsDisabled = running || submitting;

  return (
    <section
      className={cn(
        "flex w-full flex-col overflow-hidden",
        "rounded-lg border border-border",
        "bg-bg text-text",
        className,
      )}
      aria-label="Code editor workspace"
    >
      {/* Header */}
      <div
        className={cn(
          "flex flex-col gap-3",
          "border-b border-border",
          "bg-surface px-4 py-3",
          "sm:flex-row sm:items-center sm:justify-between",
        )}
      >
        {/* Language selector */}
        <label className="flex items-center gap-2 text-sm font-medium">
          <span className="text-text">Language</span>

          <select
            value={language}
            onChange={(event) =>
              onLanguageChange(event.target.value)
            }
            disabled={actionsDisabled}
            className={cn(
              "rounded-md border border-border",
              "bg-bg px-3 py-2 text-sm text-text",
              "focus-visible:outline-none",
              "focus-visible:ring-2",
              "focus-visible:ring-primary",
              "disabled:cursor-not-allowed",
              "disabled:opacity-50",
            )}
            aria-label="Programming language"
          >
            {languages.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onRun}
            disabled={actionsDisabled || readOnly}
            aria-busy={running}
          >
            {running ? "Running..." : "Run"}
          </Button>

          <Button
            type="button"
            variant="primary"
            size="sm"
            onClick={onSubmit}
            disabled={actionsDisabled}
            aria-busy={submitting}
          >
            {submitting ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </div>

      {/* Editor */}
      <div className="border-b border-border">
        <label
          htmlFor="code-editor-input"
          className="sr-only"
        >
          Code editor
        </label>

        <textarea
          {...textareaProps}
          id="code-editor-input"
          ref={ref}
          value={value}
          onChange={handleCodeChange}
          readOnly={readOnly}
          spellCheck={false}
          className={cn(
  "min-h-[320px] w-full resize-y",
  "border-0 bg-bg px-4 py-4",
  "font-mono text-sm leading-6",
  "text-text placeholder:text-muted",
  "focus-visible:outline-none",
  "focus-visible:ring-2",
  "focus-visible:ring-inset",
  "focus-visible:ring-primary",
  "disabled:cursor-not-allowed",
  "read-only:cursor-default",
  readOnly && "opacity-80",
  className,
)}
          aria-label="Code editor"
          aria-readonly={readOnly}
        />
      </div>

      {/* Output panels */}
      <div className="grid grid-cols-1 divide-y divide-border lg:grid-cols-3 lg:divide-x lg:divide-y-0">
        {/* Console */}
        <section
          className="min-h-[140px] p-4"
          aria-label="Console output"
        >
          <h2 className="mb-3 text-sm font-semibold text-text">
            Console
          </h2>

          <div className="rounded-md bg-surface p-3 font-mono text-sm text-muted">
            {consoleContent ?? "No output yet."}
          </div>
        </section>

        {/* Test cases */}
        <section
          className="min-h-[140px] p-4"
          aria-label="Test cases"
        >
          <h2 className="mb-3 text-sm font-semibold text-text">
            Test Cases
          </h2>

          <div className="rounded-md bg-surface p-3 text-sm text-muted">
            {testCases ?? "No test cases available."}
          </div>
        </section>

        {/* Verdict */}
        <section
          className="min-h-[140px] p-4"
          aria-label="Verdict"
        >
          <h2 className="mb-3 text-sm font-semibold text-text">
            Verdict
          </h2>

          <div className="rounded-md bg-surface p-3 text-sm text-muted">
            {verdict ?? "No verdict yet."}
          </div>
        </section>
      </div>
    </section>
  );
});