import type { Meta, StoryObj } from "@storybook/react";

import { Tooltip } from "./Tooltip";

const meta: Meta<typeof Tooltip> = {
  title: "Components/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Top: Story = {
  args: {
    content: "This tooltip appears on top",
    side: "top",
    children: <button>Hover me</button>,
  },
};

export const Right: Story = {
  args: {
    content: "This tooltip appears on the right",
    side: "right",
    children: <button>Hover me</button>,
  },
};

export const Bottom: Story = {
  args: {
    content: "This tooltip appears at the bottom",
    side: "bottom",
    children: <button>Hover me</button>,
  },
};

export const Left: Story = {
  args: {
    content: "This tooltip appears on the left",
    side: "left",
    children: <button>Hover me</button>,
  },
};