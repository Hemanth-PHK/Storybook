import type { Meta, StoryObj } from "@storybook/react";
import type { ReactNode } from "react";

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

const FieldTitle = () => (
  <p className="mb-5 font-semibold text-text">
    Course description{" "}
    <span className="text-danger">*</span>
  </p>
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
      <FieldTitle />

      <Textarea
        {...args}
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
      <FieldTitle />

      <Textarea
        {...args}
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

export const Error: Story = {
  render: (args) => (
    <StoryCard title="3. Error state" error>
      <FieldTitle />

      <Textarea
        {...args}
        placeholder="Enter your feedback"
        invalid
      />

      <p className="mt-5 flex items-center gap-2 font-medium text-danger">
        <span
          aria-hidden="true"
          className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-danger text-xs"
        >
          !
        </span>

        Please enter your feedback.
      </p>

      <div className="mt-6 border-t border-danger/30 pt-4">
        <p className="text-sm leading-6 text-muted">
          Show after validation fails.
          <br />
          The textarea remains available for correction.
        </p>
      </div>
    </StoryCard>
  ),
};

/* ============================================================================
   Disabled
============================================================================ */

export const Disabled: Story = {
  render: (args) => (
    <StoryCard title="4. Disabled state">
      <FieldTitle />

      <Textarea
        {...args}
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