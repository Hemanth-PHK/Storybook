import type { Meta, StoryObj } from "@storybook/react";

import { Tooltip } from "./Tooltip";

const meta: Meta<typeof Tooltip> = {
  title: "Components/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    side: "top",
    delayMs: 300,
  },
  argTypes: {
    side: {
      control: "select",
      options: ["top", "right", "bottom", "left"],
    },
    delayMs: {
      control: "number",
    },
    content: {
      control: "text",
    },
    children: {
      control: false,
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    content: "View course information",
    children: (
      <button
        type="button"
        className="rounded-md border border-border px-4 py-2"
      >
        Hover or focus me
      </button>
    ),
  },
};

export const Placements: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-16 p-16">
      <Tooltip content="Top tooltip" side="top">
        <button
          type="button"
          className="rounded-md border border-border px-4 py-2"
        >
          Top
        </button>
      </Tooltip>

      <Tooltip content="Right tooltip" side="right">
        <button
          type="button"
          className="rounded-md border border-border px-4 py-2"
        >
          Right
        </button>
      </Tooltip>

      <Tooltip content="Bottom tooltip" side="bottom">
        <button
          type="button"
          className="rounded-md border border-border px-4 py-2"
        >
          Bottom
        </button>
      </Tooltip>

      <Tooltip content="Left tooltip" side="left">
        <button
          type="button"
          className="rounded-md border border-border px-4 py-2"
        >
          Left
        </button>
      </Tooltip>
    </div>
  ),
};

export const LongContent: Story = {
  args: {
    content:
      "Your course progress is automatically saved so you can continue learning from where you stopped.",
    children: (
      <button
        type="button"
        className="rounded-md border border-border px-4 py-2"
      >
        Course progress info
      </button>
    ),
  },
};

export const EdgeCollision: Story = {
  parameters: {
    layout: "fullscreen",
  },

  render: () => (
    <div className="relative h-screen w-full">
      <div className="absolute left-0 top-1/2 -translate-y-1/2">
        <Tooltip
          content="This tooltip should remain visible inside the viewport"
          side="left"
          delayMs={0}
        >
          <button
            type="button"
            className="rounded-md border border-border px-3 py-2"
          >
            Left edge
          </button>
        </Tooltip>
      </div>

      <div className="absolute right-0 top-1/2 -translate-y-1/2">
        <Tooltip
          content="This tooltip should remain visible inside the viewport"
          side="right"
          delayMs={0}
        >
          <button
            type="button"
            className="rounded-md border border-border px-3 py-2"
          >
            Right edge
          </button>
        </Tooltip>
      </div>

      <div className="absolute left-1/2 top-0 -translate-x-1/2">
        <Tooltip
          content="This tooltip should remain visible inside the viewport"
          side="top"
          delayMs={0}
        >
          <button
            type="button"
            className="rounded-md border border-border px-3 py-2"
          >
            Top edge
          </button>
        </Tooltip>
      </div>

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
        <Tooltip
          content="This tooltip should remain visible inside the viewport"
          side="bottom"
          delayMs={0}
        >
          <button
            type="button"
            className="rounded-md border border-border px-3 py-2"
          >
            Bottom edge
          </button>
        </Tooltip>
      </div>
    </div>
  ),
};