
import { useId } from "react";

import { Modal } from "../Modal";
import { Button } from "../Button";

export interface ConfirmationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  confirmLabel: string;
  cancelLabel: string;
  variant?: "default" | "danger";
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  className?: string;
}

export function ConfirmationDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel,
  cancelLabel,
  variant = "default",
  loading = false,
  onConfirm,
  onCancel,
  className,
}: ConfirmationDialogProps) {
  const descriptionId = useId();

  const handleCancel = () => {
    if (loading) return;

    onCancel();
    onOpenChange(false);
  };

  const handleConfirm = () => {
    if (loading) return;

    onConfirm();
  };

  return (
    <Modal
      open={open}
      title={title}
      onClose={handleCancel}
      size="md"
      closeOnOverlay
      dismissible={!loading}
      initialFocusSelector="[data-confirm-cancel] button"
      aria-describedby={descriptionId}
      className={className}
    >
      <div className="min-w-0">
        <p
          id={descriptionId}
          className="break-words text-sm leading-6 text-text"
        >
          {description}
        </p>

        <div
          className={`
            mt-6 flex flex-col-reverse gap-3
            sm:flex-row sm:justify-end
          `}
        >
          <span
            data-confirm-cancel
            className="block sm:inline-flex"
          >
            <Button
              type="button"
              variant="secondary"
              disabled={loading}
              onClick={handleCancel}
              className="w-full sm:w-auto"
            >
              {cancelLabel}
            </Button>
          </span>

          <Button
            type="button"
            variant={
              variant === "danger"
                ? "danger"
                : "primary"
            }
            loading={loading}
            disabled={loading}
            onClick={handleConfirm}
            className="w-full sm:w-auto"
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

ConfirmationDialog.displayName = "ConfirmationDialog";
