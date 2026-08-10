import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Toast } from "./Toast";
import { Button } from "../Button";



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

    dismissible: {
      control: "boolean",
    },

    onDismiss: {
      action: "dismissed",
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
    dismissible: true,
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
    dismissible: true,
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
    dismissible: true,
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
    dismissible: true,
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
    dismissible: true,
  },
};


/* ============================================================================
   Without Title
   ============================================================================ */

export const WithoutTitle: Story = {
  args: {
    variant: "success",
    children: "Your changes have been saved successfully.",
    dismissible: true,
  },
};


/* ============================================================================
   Not Dismissible
   ============================================================================ */

export const NotDismissible: Story = {
  args: {
    variant: "info",
    title: "Information",
    children: "This notification cannot be dismissed.",
    dismissible: false,
  },
};


/* ============================================================================
   Long Content
   ============================================================================ */

export const LongContent: Story = {
  args: {
    variant: "warning",
    title: "Important Notice",
    children:
      "This is a longer notification message used to verify how the Toast behaves when the content spans multiple lines and different screen sizes.",
    dismissible: true,
  },
};


/* ============================================================================
   Interactive Dismiss
   ============================================================================ */

function InteractiveToastExample() {
  const [visible, setVisible] = useState(true);

function handleDismiss() {
  console.log("DISMISS FUNCTION CALLED");
  setVisible(false);
}
  function handleShow() {
    setVisible(true);
  }

  return (
    <div className="flex min-h-32 flex-col items-center justify-center gap-4">
      {visible ? (
        <Toast
          variant="success"
          title="Success"
          dismissible
          onDismiss={handleDismiss}
        >
          Your changes have been saved successfully.
        </Toast>
      ) : (
        <Button
          variant="primary"
          onClick={handleShow}
        >
          Show Toast
        </Button>
      )}
    </div>
  );
}

export const InteractiveDismiss: Story = {
  args: {
    children: "Interactive Toast",
  },

  render: () => <InteractiveToastExample />,
};