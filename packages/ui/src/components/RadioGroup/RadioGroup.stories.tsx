import type { Meta, StoryObj } from "@storybook/react";
import type { ReactNode } from "react";

import { cn } from "../../utils/cn";
import { RadioGroup } from "./RadioGroup";

const options = [
  {
    value: "dsa",
    label: "Data Structures & Algorithms",
  },
  {
    value: "react",
    label: "React",
  },
  {
    value: "python",
    label: "Python",
  },
  {
    value: "java",
    label: "Java",
  },
];

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

const meta: Meta<typeof RadioGroup> = {
  title: "Components/RadioGroup",
  component: RadioGroup,
  tags: ["autodocs"],

  args: {
    name: "course",
    options,
    orientation: "vertical",
    disabled: false,
    invalid: false,
  },

  argTypes: {
    orientation: {
      control: "select",
      options: ["vertical", "horizontal"],
    },

    disabled: {
      control: "boolean",
    },

    invalid: {
      control: "boolean",
    },

    name: {
      control: "text",
    },
  },
};

export default meta;

type Story = StoryObj<typeof RadioGroup>;

/* ============================================================================
   Vertical
============================================================================ */

export const Vertical: Story = {
  render: (args) => (
    <StoryCard title="1. Vertical orientation">
      <FieldTitle />

      <RadioGroup
        {...args}
        orientation="vertical"
        defaultValue="dsa"
      />

      <div className="mt-6 border-t border-border pt-4">
        <p className="text-sm text-muted">
          Options are displayed vertically.
        </p>
      </div>
    </StoryCard>
  ),
};

/* ============================================================================
   Horizontal
============================================================================ */

export const Horizontal: Story = {
  render: (args) => (
    <StoryCard title="2. Horizontal orientation">
      <FieldTitle />

      <RadioGroup
        {...args}
        orientation="horizontal"
        defaultValue="react"
      />

      <div className="mt-6 border-t border-border pt-4">
        <p className="text-sm text-muted">
          Options are displayed horizontally.
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

      <RadioGroup
        {...args}
        invalid
        defaultValue=""
      />

      <p className="mt-5 flex items-center gap-2 font-medium text-danger">
        <span
          aria-hidden="true"
          className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-danger text-xs"
        >
          !
        </span>

        Please select one option.
      </p>

      <div className="mt-6 border-t border-danger/30 pt-4">
        <p className="text-sm text-muted">
          Show after validation fails. All options must
          remain selectable.
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

      <RadioGroup
        {...args}
        disabled
        defaultValue="react"
      />

      <div className="mt-6 border-t border-border pt-4">
        <p className="text-sm text-muted">
          All options are disabled and cannot be selected.
        </p>
      </div>
    </StoryCard>
  ),
};

/* ============================================================================
   Validation States
============================================================================ */

export const ValidationStates: Story = {
  render: (args) => (
    <div className="grid gap-6 lg:grid-cols-3">
      <StoryCard title="1. Default state">
        <FieldTitle />

        <RadioGroup
          {...args}
          invalid={false}
          defaultValue=""
        />

        <div className="mt-6 border-t border-border pt-4">
          <p className="text-sm leading-6 text-muted">
            Before validation:
            <br />
            no error message is displayed.
          </p>
        </div>
      </StoryCard>

      <StoryCard title="2. Error state" error>
        <FieldTitle />

        <RadioGroup
          {...args}
          invalid
          defaultValue=""
        />

        <p className="mt-5 flex items-center gap-2 font-medium text-danger">
          <span
            aria-hidden="true"
            className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-danger text-xs"
          >
            !
          </span>

          Please select one option.
        </p>

        <div className="mt-6 border-t border-danger/30 pt-4">
          <p className="text-sm leading-6 text-muted">
            Show after validation fails.
            <br />
            All options must remain selectable.
          </p>
        </div>
      </StoryCard>

      <StoryCard title="3. Corrected state">
        <FieldTitle />

        <RadioGroup
          {...args}
          invalid={false}
          defaultValue="dsa"
        />

        <p className="mt-6 font-medium text-success">
          Selection accepted.
        </p>

        <div className="mt-6 border-t border-border pt-4">
          <p className="text-sm leading-6 text-muted">
            After selection:
            <br />
            remove the error state and message.
          </p>
        </div>
      </StoryCard>
    </div>
  ),
};