import type { Meta, StoryObj } from "@storybook/react";
import type { ReactNode } from "react";

import { cn } from "../../utils/cn";
import { Select } from "./Select";

const options = (
  <>
    <option value="dsa">
      Data Structures & Algorithms
    </option>
    <option value="react">React</option>
    <option value="python">Python</option>
    <option value="java">Java</option>
  </>
);

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
    Select a course{" "}
    <span className="text-danger">*</span>
  </p>
);

const meta: Meta<typeof Select> = {
  title: "Components/Select",
  component: Select,
  tags: ["autodocs"],

  args: {
    placeholder: "Select a course",
  },

  argTypes: {
    invalid: {
      control: "boolean",
    },

    disabled: {
      control: "boolean",
    },

    placeholder: {
      control: "text",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Select>;

/* ============================================================================
   Default
============================================================================ */

export const Default: Story = {
  render: (args) => (
    <StoryCard title="1. Default state">
      <FieldTitle />

      <Select {...args}>
        {options}
      </Select>

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
   Error
============================================================================ */

export const Error: Story = {
  render: (args) => (
    <StoryCard title="2. Error state" error>
      <FieldTitle />

      <Select
        {...args}
        invalid
        defaultValue=""
      >
        {options}
      </Select>

      <p className="mt-5 flex items-center gap-2 font-medium text-danger">
        <span
          aria-hidden="true"
          className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-danger text-xs"
        >
          !
        </span>

        Please select a course.
      </p>

      <div className="mt-6 border-t border-danger/30 pt-4">
        <p className="text-sm leading-6 text-muted">
          Show after validation fails.
          <br />
          The select remains available for correction.
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
    <StoryCard title="3. Disabled state">
      <FieldTitle />

      <Select
        {...args}
        disabled
        defaultValue="react"
      >
        {options}
      </Select>

      <div className="mt-6 border-t border-border pt-4">
        <p className="text-sm leading-6 text-muted">
          The select is disabled and cannot be changed.
        </p>
      </div>
    </StoryCard>
  ),
};