import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import {
  ConfirmationDialog,
  type ConfirmationDialogProps,
} from "./ConfirmationDialog";

const meta: Meta<typeof ConfirmationDialog> = {
  title: "Components/ConfirmationDialog",
  component: ConfirmationDialog,
  tags: ["autodocs"],

  parameters: {
    layout: "centered",
  },

  argTypes: {
    open: {
      control: "boolean",
      description: "Controls whether the dialog is open.",
    },

    title: {
      control: "text",
    },

    description: {
      control: "text",
    },

    confirmLabel: {
      control: "text",
    },

    cancelLabel: {
      control: "text",
    },

    variant: {
      control: "select",
      options: ["default", "danger"],
    },

    loading: {
      control: "boolean",
    },

    onOpenChange: {
      table: {
        disable: true,
      },
    },

    onConfirm: {
      table: {
        disable: true,
      },
    },

    onCancel: {
      table: {
        disable: true,
      },
    },

    className: {
      table: {
        disable: true,
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof ConfirmationDialog>;

const ConfirmationDialogDemo = (
  args: ConfirmationDialogProps,
) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-[700px] max-w-full">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="
          rounded-md
          bg-primary
          px-4
          py-2
          text-sm
          font-medium
          text-primary-foreground
          hover:opacity-90
          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-primary
          focus-visible:ring-offset-2
        "
      >
        Open Confirmation Dialog
      </button>

      <ConfirmationDialog
        {...args}
        open={open}
        onOpenChange={setOpen}
        onConfirm={() => {
          console.log("Confirmation accepted");
          setOpen(false);
        }}
        onCancel={() => {
          console.log("Confirmation cancelled");
          setOpen(false);
        }}
      />
    </div>
  );
};

export const Default: Story = {
  args: {
    open: false,
    title: "Confirm action",
    description:
      "Are you sure you want to continue with this action?",
    confirmLabel: "Confirm",
    cancelLabel: "Cancel",
    variant: "default",
    loading: false,
  },

  render: (args) => (
    <ConfirmationDialogDemo {...args} />
  ),
};

export const Destructive: Story = {
  args: {
    open: false,
    title: "Delete item",
    description:
      "Are you sure you want to delete this item? This action cannot be undone.",
    confirmLabel: "Delete",
    cancelLabel: "Cancel",
    variant: "danger",
    loading: false,
  },

  render: (args) => (
    <ConfirmationDialogDemo {...args} />
  ),
};

export const Loading: Story = {
  args: {
    open: false,
    title: "Processing request",
    description:
      "Please wait while your request is being processed.",
    confirmLabel: "Confirm",
    cancelLabel: "Cancel",
    variant: "default",
    loading: true,
  },

  render: (args) => (
    <ConfirmationDialogDemo {...args} />
  ),
};






