import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../Button";
import { EmptyState } from "./EmptyState";

const meta = {
  title: "Components/EmptyState",
  component: EmptyState,
  tags: ["autodocs"],
  args: {
    title: "No lessons yet",
    description: "Lessons will appear here when they are added.",
  },
} satisfies Meta<typeof EmptyState>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {};
export const WithAction: Story = {
  args: {
    icon: (
      <svg aria-hidden="true" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 5h7l2 2h9v13H3z" />
      </svg>
    ),
    action: <Button>Add a lesson</Button>,
  },
};
