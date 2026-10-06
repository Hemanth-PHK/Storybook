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
    action: <Button onClick={() => window.alert("Recovery requested")}>Try again</Button>,
  },
};

export const WithoutAction: Story = {
  args: {
    description: "Your lesson list is temporarily unavailable.",
  },
};
