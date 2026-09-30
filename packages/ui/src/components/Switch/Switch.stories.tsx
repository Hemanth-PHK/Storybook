import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { Switch, type SwitchProps } from "./Switch";



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

function DefaultSwitchStory(args: SwitchProps) {
  const [enabled, setEnabled] = useState(false);

  return (
    <Switch
      {...args}
      label={
        enabled
          ? "Notifications enabled"
          : "Enable notifications"
      }
      checked={enabled}
      onChange={(e) => setEnabled(e.target.checked)}
    />
  );
}

export const Default: Story = {
  render: (args) => <DefaultSwitchStory {...args} />,
  args: {
    label: "Enable notifications",
  },
};

/* ============================================================================
   Checked
============================================================================ */

function CheckedSwitchStory(args: SwitchProps) {
  const [enabled, setEnabled] = useState(true);

  return (
    <Switch
      {...args}
      label={
        enabled
          ? "Notifications enabled"
          : "Notifications disabled"
      }
      checked={enabled}
      onChange={(e) => setEnabled(e.target.checked)}
    />
  );
}

export const Checked: Story = {
  render: (args) => <CheckedSwitchStory {...args} />,
  args: {
    label: "Notifications enabled",
  },
};

/* ============================================================================
   Error
============================================================================ */

function ErrorSwitchStory(args: SwitchProps) {
  const [accepted, setAccepted] = useState(false);

  return (
    <Switch
      {...args}
      label={
        accepted
          ? "Learning policy accepted"
          : "Please accept learning policy"
      }
      checked={accepted}
      invalid={!accepted}
      onChange={(e) => setAccepted(e.target.checked)}
    />
  );
}

export const Error: Story = {
  render: (args) => <ErrorSwitchStory {...args} />,

  args: {
    label: "Accept learning policy",
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