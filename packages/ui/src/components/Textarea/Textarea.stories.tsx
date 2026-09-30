import type { Meta, StoryObj } from "@storybook/react";
import { useState, type ReactNode } from "react";

import { cn } from "../../utils/cn";
import { Textarea } from "./Textarea";

const StoryCard = ({
  title,
  children,
  error = false,
}: {
  title: string;
  children: ReactNode;
  error?: boolean;
}) => (
  <div
    className={cn(
      "rounded-xl border p-8",
      "bg-surface",
      error
        ? "border-danger bg-danger/5"
        : "border-border",
    )}
  >
    <h3 className="mb-6 text-lg font-semibold text-text">
      {title}
    </h3>

    {children}
  </div>
);

const FieldTitle = ({ htmlFor }: { htmlFor: string }) => (
  <label
    htmlFor={htmlFor}
    className="mb-5 block font-semibold text-text"
  >
    Course description{" "}
    <span className="text-danger">*</span>
  </label>
);

const meta: Meta<typeof Textarea> = {
  title: "Components/Textarea",
  component: Textarea,
  tags: ["autodocs"],

  args: {
    placeholder: "Enter your message",
  },

  argTypes: {
    invalid: {
      control: "boolean",
    },

    showCount: {
      control: "boolean",
    },

    disabled: {
      control: "boolean",
    },

    maxLength: {
      control: "number",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Textarea>;

/* ============================================================================
   Default
============================================================================ */

export const Default: Story = {
  render: (args) => (
    <StoryCard title="1. Default state">
      <FieldTitle htmlFor="default-description" />

      <Textarea
        {...args}
          id="default-description"
        placeholder="Enter your message"
      />

      <div className="mt-6 border-t border-border pt-4">
        <p className="text-sm leading-6 text-muted">
          Before validation:
          <br />
          no error message is displayed.
        </p>
      </div>
    </StoryCard>
  ),
};

/* ============================================================================
   Character Limit
============================================================================ */

export const CharacterLimit: Story = {
  render: (args) => (
    <StoryCard title="2. Character limit">
      <FieldTitle htmlFor="limited-description"  />

      <Textarea
        {...args}
        id="limited-description"
        placeholder="Write your course description..."
        showCount
        maxLength={200}
      />

      <div className="mt-6 border-t border-border pt-4">
        <p className="text-sm leading-6 text-muted">
          Character count is displayed when a maximum
          length is provided.
          <br />
          Native maxLength prevents additional input.
        </p>
      </div>
    </StoryCard>
  ),
};

/* ============================================================================
   Error
============================================================================ */



function ErrorStory() {
  const [feedback, setFeedback] = useState("");

  const MIN_LENGTH = 20;

  const trimmedFeedback = feedback.trim();
  const characterCount = trimmedFeedback.length;

  const isEmpty = characterCount === 0;
  const isTooShort =
    characterCount > 0 && characterCount < MIN_LENGTH;

  const hasError = isEmpty || isTooShort;

  const errorMessage = isEmpty
    ? "Feedback is required."
    : isTooShort
      ? `Please enter at least ${MIN_LENGTH} characters.`
      : "";

  return (
    <StoryCard title="3. Error state" error={hasError}>
      <label
        htmlFor="error-feedback"
        className="mb-5 block font-semibold text-text"
      >
        Course feedback{" "}
        <span className="text-danger">*</span>
      </label>

      <Textarea
        id="error-feedback"
        placeholder="Describe your learning experience..."
        value={feedback}
        onChange={(event) => setFeedback(event.target.value)}
        invalid={hasError}
        required
        minLength={MIN_LENGTH}
        aria-describedby={
          hasError ? "feedback-error" : undefined
        }
      />

      {hasError && (
        <p
          id="feedback-error"
          role="alert"
          className="mt-3 flex items-center gap-2 text-sm font-medium text-danger"
        >
          <span aria-hidden="true">!</span>
          {errorMessage}
        </p>
      )}

      <div className="mt-6 border-t border-border pt-4">
        <p className="text-sm leading-6 text-muted">
          Feedback must contain at least {MIN_LENGTH} meaningful
          characters.
          <br />
          Validation updates as the user corrects the input.
        </p>
      </div>
    </StoryCard>
  );
}

export const Error: Story = {
  render: () => <ErrorStory />,
};


/* ============================================================================
   Disabled
============================================================================ */

export const Disabled: Story = {
  render: (args) => (
    <StoryCard title="4. Disabled state">
      <FieldTitle htmlFor="disabled-description" />

      <Textarea
        {...args}
        id="disabled-description"
        placeholder="This field is disabled"
        disabled
      />

      <div className="mt-6 border-t border-border pt-4">
        <p className="text-sm leading-6 text-muted">
          The textarea is disabled and cannot be edited.
        </p>
      </div>
    </StoryCard>
  ),
};