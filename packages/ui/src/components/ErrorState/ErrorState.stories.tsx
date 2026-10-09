import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "../Button";
import { ErrorState } from "./ErrorState";

const meta = {
  title: "Components/ErrorState",
  component: ErrorState,
  tags: ["autodocs"],
  args: {
    title: "Unable to load your lessons",
    description: "Please try again in a moment.",
  },
} satisfies Meta<typeof ErrorState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithRecoveryAction: Story = {
  args: {
    icon: <span aria-hidden="true">!</span>,
    action: <Button type="button" className="bg-primary text-on-primary" onClick={() => window.alert("Recovery requested")}>Try again</Button>,
  },
};

export const WithoutAction: Story = {
  args: {
    description: "Your lesson list is temporarily unavailable.",
  },
};

export const LongMessage: Story = { args: { title: "Course loading failed", description: "NetworkDiagnostic".repeat(60) } };
export const AssessmentError: Story = { args: { title: "Unable to load assessment", description: "Your answers are saved. Retry when your connection returns." } };
function RetryExample() {
  const [loading, setLoading] = useState(false);
  return <ErrorState title="Network error" description="Reconnect and try again." action={<Button type="button" className="bg-primary text-on-primary" loading={loading} onClick={() => setLoading(true)}>Retry</Button>} />;
}
export const LoadingRetry: Story = { render: () => <RetryExample /> };
