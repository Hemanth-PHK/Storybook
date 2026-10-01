
import { useEffect, useRef, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";

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
    variant: {
      control: "select",
      options: ["default", "danger"],
    },
    title: { control: "text" },
    description: { control: "text" },
    confirmLabel: { control: "text" },
    cancelLabel: { control: "text" },
    open: { control: false },
    loading: { control: false },
    onOpenChange: { control: false },
    onConfirm: { control: false },
    onCancel: { control: false },
    className: { control: false },
  },
};

export default meta;

type Story = StoryObj<typeof ConfirmationDialog>;

interface DemoProps
  extends Omit<
    ConfirmationDialogProps,
    "open" | "onOpenChange" | "onConfirm" | "onCancel"
  > {
  simulateLoading?: boolean;
}

function ConfirmationDialogDemo({
  simulateLoading = false,
  ...args
}: DemoProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const handleConfirm = () => {
    if (loading) return;

    if (!simulateLoading) {
      setMessage("Action confirmed.");
      setOpen(false);
      return;
    }

    setLoading(true);
    setMessage("Processing confirmation...");

    timerRef.current = setTimeout(() => {
      setLoading(false);
      setOpen(false);
      setMessage("Confirmation completed successfully.");
      timerRef.current = null;
    }, 1500);
  };

  const handleCancel = () => {
    setMessage("Action cancelled.");
  };

  return (
    <div className="w-full max-w-md p-4">
      <button
        type="button"
        onClick={() => {
          setMessage("");
          setOpen(true);
        }}
        className="
          rounded-md bg-primary px-4 py-2
          text-sm font-medium text-primary-foreground
          hover:opacity-90
          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-primary
        "
      >
        Open Confirmation Dialog
      </button>

      {message && (
        <p
          role="status"
          className="mt-4 text-sm text-text"
        >
          {message}
        </p>
      )}

      <ConfirmationDialog
        {...args}
        open={open}
        loading={loading}
        onOpenChange={setOpen}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </div>
  );
}

export const Default: Story = {
  args: {
    title: "Confirm action",
    description:
      "Are you sure you want to continue with this action?",
    confirmLabel: "Confirm",
    cancelLabel: "Cancel",
    variant: "default",
  },
  render: (args) => (
    <ConfirmationDialogDemo {...args} />
  ),
};

export const Destructive: Story = {
  args: {
    title: "Delete course",
    description:
      "Are you sure you want to delete this course? This action cannot be undone.",
    confirmLabel: "Delete course",
    cancelLabel: "Keep course",
    variant: "danger",
  },
  render: (args) => (
    <ConfirmationDialogDemo {...args} />
  ),
};

export const Loading: Story = {
  args: {
    title: "Save changes",
    description:
      "Confirm to save your changes. The dialog will remain open while the request is processing.",
    confirmLabel: "Save changes",
    cancelLabel: "Cancel",
    variant: "default",
  },
  render: (args) => (
    <ConfirmationDialogDemo
      {...args}
      simulateLoading
    />
  ),
};
