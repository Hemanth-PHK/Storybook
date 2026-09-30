import type { Meta, StoryObj } from "@storybook/react";

import { Switch } from "./Switch";

const meta: Meta<typeof Switch> = {
  title: "Components/Switch",
  component: Switch,
  tags: ["autodocs"],

  args: {
    label: "Enable notifications",
  },

  argTypes: {
    label: {
      control: "text",
    },

    invalid: {
      control: "boolean",
    },

    disabled: {
      control: "boolean",
    },

    checked: {
      control: "boolean",
    },

    defaultChecked: {
      control: "boolean",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Switch>;

/* ============================================================================
   Default
============================================================================ */

export const Default: Story = {
  args: {
    label: "Enable notifications",
  },
};

/* ============================================================================
   Checked
============================================================================ */

export const Checked: Story = {
  args: {
    label: "Enable notifications",
    defaultChecked: true,
  },
};

/* ============================================================================
   Error
============================================================================ */

export const Error: Story = {
  args: {
    label: "Enable notifications",
    invalid: true,
  },
};

/* ============================================================================
   Disabled
============================================================================ */

export const Disabled: Story = {
  args: {
    label: "Enable notifications",
    disabled: true,
  },
};