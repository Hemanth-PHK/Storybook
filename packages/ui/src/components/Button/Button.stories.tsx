import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "./Button";

/* ============================================================================
   Button.stories — THE REFERENCE STORY
   ----------------------------------------------------------------------------
   Every exported object below represents one visual state.

   Storybook automatically creates interactive documentation.

   Use this file to verify

   • Different variants
   • Different sizes
   • Loading state
   • Disabled state
   • Theme switching
   • Accessibility

   Each story represents a realistic use case.
============================================================================ */

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],

  args: {
    children: "Click Me",
    variant: "primary",
    size: "md",
    loading: false,
    disabled: false,
  },

  argTypes: {
    variant: {
      control: "select",
      options: [
        "primary",
        "secondary",
        "outline",
        "ghost",
        "danger",
      ],
    },

    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },

    loading: {
      control: "boolean",
    },

    disabled: {
      control: "boolean",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

/* ============================================================================
   Primary
============================================================================ */

export const Primary: Story = {};

/* ============================================================================
   Secondary
============================================================================ */

export const Secondary: Story = {
  args: {
    variant: "secondary",
  },
};

/* ============================================================================
   Outline
============================================================================ */

export const Outline: Story = {
  args: {
    variant: "outline",
  },
};

/* ============================================================================
   Ghost
============================================================================ */

export const Ghost: Story = {
  args: {
    variant: "ghost",
  },
};

/* ============================================================================
   Danger
============================================================================ */

export const Danger: Story = {
  args: {
    variant: "danger",
    children: "Delete",
  },
};

/* ============================================================================
   Small
============================================================================ */

export const Small: Story = {
  args: {
    size: "sm",
  },
};

/* ============================================================================
   Medium
============================================================================ */

export const Medium: Story = {
  args: {
    size: "md",
  },
};

/* ============================================================================
   Large
============================================================================ */

export const Large: Story = {
  args: {
    size: "lg",
  },
};

/* ============================================================================
   Loading
============================================================================ */

export const Loading: Story = {
  args: {
    loading: true,
  },
};

/* ============================================================================
   Disabled
============================================================================ */

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

/* ============================================================================
   All Variants
============================================================================ */

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="primary">Primary</Button>

      <Button variant="secondary">Secondary</Button>

      <Button variant="outline">Outline</Button>

      <Button variant="ghost">Ghost</Button>

      <Button variant="danger">Danger</Button>
    </div>
  ),
};

/* ============================================================================
   All Sizes
============================================================================ */

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button size="sm">Small</Button>

      <Button size="md">Medium</Button>

      <Button size="lg">Large</Button>
    </div>
  ),
};