import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Modal } from "./Modal";
import { Button } from "../Button";

/* ============================================================================
   Modal.stories — THE REFERENCE STORY
   ----------------------------------------------------------------------------
   Every exported object below represents one visual state.

   Storybook automatically creates interactive documentation.

   Use this file to verify

   • Different sizes
   • Different titles
   • Different content
   • Theme switching
   • Accessibility
   • Component behavior

   Each story represents a realistic use case.
============================================================================ */

const meta: Meta<typeof Modal> = {
  title: "Components/Modal",
  component: Modal,
  tags: ["autodocs"],

  args: {
    open: true,
    title: "Delete Student",
    size: "md",
    closeOnOverlay: true,
  },

  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },

    open: {
      control: "boolean",
    },

    closeOnOverlay: {
      control: "boolean",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Modal>;

/* ============================================================================
   Interactive Wrapper
============================================================================ */

type InteractiveModalProps = {
  args: React.ComponentProps<typeof Modal>;
  children: React.ReactNode;
};

function InteractiveModal({
  args,
  children,
}: InteractiveModalProps) {
  const [open, setOpen] = useState(args.open);

  return (
    <>
      {!open && (
        <Button onClick={() => setOpen(true)}>
          Open Modal
        </Button>
      )}

      <Modal
        {...args}
        open={open}
        onClose={() => setOpen(false)}
      >
        {children}
      </Modal>
    </>
  );
}

/* ============================================================================
   Default
============================================================================ */

export const Default: Story = {
  render: (args) => (
    <InteractiveModal args={args}>
      <p>Are you sure you want to delete this student?</p>
    </InteractiveModal>
  ),
};

/* ============================================================================
   Small
============================================================================ */

export const Small: Story = {
  args: {
    size: "sm",
    title: "Small Modal",
  },

  render: (args) => (
    <InteractiveModal args={args}>
      <p>This is a small modal.</p>
    </InteractiveModal>
  ),
};

/* ============================================================================
   Medium
============================================================================ */

export const Medium: Story = {
  args: {
    size: "md",
    title: "Medium Modal",
  },

  render: (args) => (
    <InteractiveModal args={args}>
      <p>This is a medium sized modal.</p>
    </InteractiveModal>
  ),
};

/* ============================================================================
   Large
============================================================================ */

export const Large: Story = {
  args: {
    size: "lg",
    title: "Large Modal",
  },

  render: (args) => (
    <InteractiveModal args={args}>
      <p>
        This is a large modal with additional space
        for larger content.
      </p>
    </InteractiveModal>
  ),
};
/* ============================================================================
   Confirmation Dialog
============================================================================ */
/* ============================================================================
   Delete Confirmation
   ----------------------------------------------------------------------------
   Negative / destructive confirmation modal.

   Used when the user is about to perform a destructive action
   such as deleting an item.
   ============================================================================ */

export const DeleteConfirmation: Story = {
  args: {
    title: "Delete Confirmation",
    size: "md",
    closeOnOverlay: false,
  },

  render: (args) => (
    <InteractiveModal args={args}>
      <>
        <p className="mb-4">
          Are you sure you want to delete this item?
        </p>

        <div className="flex justify-end gap-2">
          <Button variant="secondary">
            Cancel
          </Button>

          <Button variant="danger">
            Delete
          </Button>
        </div>
      </>
    </InteractiveModal>
  ),
};


/* ============================================================================
   Submit Confirmation
   ----------------------------------------------------------------------------
   Positive confirmation modal.

   Used when the user is about to submit or confirm information.
   ============================================================================ */

export const SubmitConfirmation: Story = {
  args: {
    title: "Submit Confirmation",
    size: "md",
    closeOnOverlay: false,
  },

  render: (args) => (
    <InteractiveModal args={args}>
      <>
        <p className="mb-4">
          Are you sure you want to submit this information?
        </p>

        <div className="flex justify-end gap-2">
          <Button variant="secondary">
            Cancel
          </Button>

          <Button variant="primary">
            Submit
          </Button>
        </div>
      </>
    </InteractiveModal>
  ),
};

/* ============================================================================
   Without Title
============================================================================ */

export const WithoutTitle: Story = {
  args: {
    title: undefined,
  },

  render: (args) => (
    <InteractiveModal args={args}>
      <p>This modal has no title.</p>
    </InteractiveModal>
  ),
};

/* ============================================================================
   Overlay Disabled
============================================================================ */

export const OverlayDisabled: Story = {
  args: {
    title: "Overlay Disabled",
    closeOnOverlay: false,
  },

  render: (args) => (
    <InteractiveModal args={args}>
      <p>
        Clicking outside this modal will not close it.
      </p>
    </InteractiveModal>
  ),
};

/* ============================================================================
   Scrollable Content
============================================================================ */

export const ScrollableContent: Story = {
  args: {
    size: "lg",
    title: "Scrollable Content",
  },

  render: (args) => (
    <InteractiveModal args={args}>
      <div className="space-y-4 max-h-80 overflow-y-auto">
        {Array.from({ length: 20 }).map((_, index) => (
          <p key={index}>
            This is sample content line {index + 1}.
          </p>
        ))}
      </div>
    </InteractiveModal>
  ),
};