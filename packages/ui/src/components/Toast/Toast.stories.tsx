import type { Meta, StoryObj } from "@storybook/react";

import { Toast } from "./Toast";

/* ============================================================================
   Toast Stories
   ----------------------------------------------------------------------------
   Stories used to test:

   1. Default Toast
   2. Success Toast
   3. Error Toast
   4. Warning Toast
   5. Info Toast
   6. Success Toast Without Title
   7. Error Toast Without Title
   8. Success Toast With Long Content
   9. Warning Toast With Long Content
   10. All Toast Variants Together
   ============================================================================ */

const meta = {
  title: "Components/Toast",
  component: Toast,

  parameters: {
    layout: "centered",
  },

  tags: ["autodocs"],

  argTypes: {
    variant: {
      control: "select",
      options: ["success", "error", "warning", "info"],
    },
  },
} satisfies Meta<typeof Toast>;

export default meta;

type Story = StoryObj<typeof meta>;


/* ============================================================================
   Default
   ============================================================================ */

export const Default: Story = {
  args: {
    variant: "info",
    title: "Information",
    children: "This is an informational notification.",
  },
};


/* ============================================================================
   Success
   ============================================================================ */

export const Success: Story = {
  args: {
    variant: "success",
    title: "Success",
    children: "Your changes have been saved successfully.",
  },
};


/* ============================================================================
   Error
   ============================================================================ */

export const Error: Story = {
  args: {
    variant: "error",
    title: "Error",
    children: "Something went wrong. Please try again.",
  },
};


/* ============================================================================
   Warning
   ============================================================================ */

export const Warning: Story = {
  args: {
    variant: "warning",
    title: "Warning",
    children: "Please review your information before continuing.",
  },
};


/* ============================================================================
   Info
   ============================================================================ */

export const Info: Story = {
  args: {
    variant: "info",
    title: "Information",
    children: "A new update is available.",
  },
};


/* ============================================================================
   Success Without Title
   ----------------------------------------------------------------------------
   Positive Toast without a heading.
   ============================================================================ */

export const SuccessWithoutTitle: Story = {
  args: {
    variant: "success",
    children: "Your changes have been saved successfully.",
  },
};


/* ============================================================================
   Error Without Title
   ----------------------------------------------------------------------------
   Negative Toast without a heading.
   ============================================================================ */

export const ErrorWithoutTitle: Story = {
  args: {
    variant: "error",
    children: "Something went wrong while processing your request.",
  },
};


/* ============================================================================
   Success Long Content
   ----------------------------------------------------------------------------
   Positive Toast containing a longer message.
   ============================================================================ */

export const SuccessLongContent: Story = {
  args: {
    variant: "success",
    title: "Operation Completed",
    children:
      "Your changes have been saved successfully. All requested updates were processed correctly and the latest information is now available in the system.",
  },
};


/* ============================================================================
   Warning Long Content
   ----------------------------------------------------------------------------
   Warning Toast containing a longer message.
   ============================================================================ */

export const WarningLongContent: Story = {
  args: {
    variant: "warning",
    title: "Important Notice",
    children:
      "Please review the provided information carefully before continuing. Some details may require your attention to prevent unexpected results during the next step.",
  },
};


/* ============================================================================
   All Toasts
   ----------------------------------------------------------------------------
   Displays all supported Toast variants together.

   This story helps verify:
   - Variant colors
   - Icons
   - Typography
   - Spacing
   - Consistent dimensions
   - Theme behavior
   ============================================================================ */

export const AllToasts: Story = {
  args: {
    children: "All Toast Variants",
  },

  render: () => (
    <div className="flex flex-col gap-5">

      <Toast
        variant="success"
        title="Success"
      >
        Your changes have been saved successfully.
      </Toast>

      <Toast
        variant="error"
        title="Error"
      >
        Something went wrong. Please try again.
      </Toast>

      <Toast
        variant="warning"
        title="Warning"
      >
        Please review your information before continuing.
      </Toast>

      <Toast
        variant="info"
        title="Information"
      >
        A new update is available.
      </Toast>

    </div>
  ),
};