
import type { Meta, StoryObj } from "@storybook/react";
import { useState, type ReactNode } from "react";

import { cn } from "../../utils/cn";
import { Select, type SelectOption } from "./Select";

const courses: SelectOption[] = [
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
  {
    value: "advanced-dsa",
    label:
      "Advanced Data Structures and Algorithms with Problem Solving and Competitive Programming",
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
      "box-border w-full min-w-0 max-w-full",
      "rounded-xl border p-4 sm:p-6 lg:p-8",
      "bg-surface",
      error
        ? "border-danger bg-danger/5"
        : "border-border",
    )}
  >
    <h3 className="mb-5 text-base font-semibold text-text sm:text-lg">
      {title}
    </h3>

    {children}
  </div>
);

const meta: Meta<typeof Select> = {
  title: "Components/Select",
  component: Select,
  tags: ["autodocs"],
  args: {
    placeholder: "Select a course",
    options: courses,
  },
};

export default meta;

type Story = StoryObj<typeof Select>;

/* ============================================================================
   Default
============================================================================ */

function DefaultStory() {
  const [course, setCourse] = useState("");

  return (
    <StoryCard title="1. Default state">
      <label
        htmlFor="default-course"
        className="mb-3 block text-sm font-semibold text-text"
      >
        Select a course <span className="text-danger">*</span>
      </label>

      <Select
        id="default-course"
        options={courses}
        value={course}
        onChange={setCourse}
        placeholder="Select a course"
        required
      />

      <p className="mt-3 text-sm leading-5 text-muted">
        {course
          ? "Course selected successfully."
          : "Choose a course to continue."}
      </p>
    </StoryCard>
  );
}

export const Default: Story = {
  render: () => <DefaultStory />,
};

/* ============================================================================
   Error
============================================================================ */

function ErrorStory() {
  const [course, setCourse] = useState("");
  const hasError = course === "";

  return (
    <StoryCard title="2. Error state" error={hasError}>
      <label
        htmlFor="error-course"
        className="mb-3 block text-sm font-semibold text-text"
      >
        Select a course <span className="text-danger">*</span>
      </label>

      <Select
        id="error-course"
        options={courses}
        value={course}
        onChange={setCourse}
        placeholder="Select a course"
        invalid={hasError}
        required
        aria-describedby={
          hasError ? "course-error-message" : undefined
        }
      />

      {hasError ? (
        <p
          id="course-error-message"
          className="mt-3 text-sm font-medium leading-5 text-danger"
        >
          Please select a course.
        </p>
      ) : (
        <p
          role="status"
          className="mt-3 text-sm leading-5 text-success"
        >
          Course selected successfully.
        </p>
      )}
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
  render: () => (
    <StoryCard title="3. Disabled state">
      <label
        htmlFor="disabled-course"
        className="mb-3 block text-sm font-semibold text-text"
      >
        Select a course
      </label>

      <Select
        id="disabled-course"
        options={courses}
        defaultValue="react"
        disabled
      />

      <p className="mt-3 text-sm leading-5 text-muted">
        The selected course cannot be changed.
      </p>
    </StoryCard>
  ),
};
