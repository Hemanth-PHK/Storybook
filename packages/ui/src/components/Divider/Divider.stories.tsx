import type { Meta, StoryObj } from "@storybook/react";

import { Divider } from "./Divider";

const meta: Meta<typeof Divider> = {
  title: "Components/Divider",
  component: Divider,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  args: {
    orientation: "horizontal",
  },
};

export const Vertical: Story = {
  render: () => (
    <div className="flex h-32 items-center gap-6">
      <span>Left content</span>

      <Divider orientation="vertical" />

      <span>Right content</span>
    </div>
  ),
};

export const WithLabel: Story = {
  args: {
    orientation: "horizontal",
    label: "OR",
  },
};