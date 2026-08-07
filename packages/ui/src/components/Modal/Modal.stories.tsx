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
   ----------------------------------------------------------------------------
   Generic informational modal.
============================================================================ */

export const Default: Story = {
  args: {
    title: "Student Details",
    size: "md",
  },

  render: (args) => (
    <InteractiveModal args={args}>
      <div className="space-y-4">
        <p>
          This modal displays information about a student. It can be used
          to show details, forms, or other content without requiring a
          confirmation action.
        </p>

        <p className="text-sm text-muted">
          You can close this dialog by clicking the close icon or outside
          the modal.
        </p>
      </div>
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

export const Large: Story = {
  args: {
    size: "lg",
    title: "Student Profile",
  },

  render: (args) => (
    <InteractiveModal args={args}>
      <div className="space-y-4">
        <p>
          This large modal provides additional space for displaying
          detailed information, forms, or rich content.
        </p>

        <p>
          It is commonly used for profile management, editing records,
          or reviewing large datasets before saving.
        </p>
      </div>
    </InteractiveModal>
  ),
};
/* ============================================================================
   Confirmation Dialog
============================================================================ */
/* ============================================================================
   Delete Confirmation
============================================================================ */

export const DeleteConfirmation: Story = {
  args: {
    title: "Delete Student",
    size: "md",
    closeOnOverlay: false,
  },

  render: (args) => (
    <InteractiveModal args={args}>
      <>
        <div className="space-y-3">
          <p className="text-base">
            Are you sure you want to permanently delete this student?
          </p>

          <p className="text-sm text-muted">
            This action cannot be undone.
          </p>
        </div>

        <div className="mt-8 flex justify-end gap-3 border-t border-border pt-5">
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
============================================================================ */

export const SubmitConfirmation: Story = {
  args: {
    title: "Submit Application",
    size: "md",
    closeOnOverlay: false,
  },

  render: (args) => (
    <InteractiveModal args={args}>
      <>
        <div className="space-y-3">
          <p className="text-base">
            Are you sure you want to submit this application?
          </p>

          <p className="text-sm text-muted">
            Once submitted, the information cannot be edited.
          </p>
        </div>

        <div className="mt-8 flex justify-end gap-3 border-t border-border pt-5">
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