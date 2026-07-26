import type { Meta, StoryObj } from "@storybook/react";

import { Card } from "./Card";
import { Button } from "../Button";

/* ============================================================================
   Card.stories — THE REFERENCE STORY
   ----------------------------------------------------------------------------
   Every exported object below represents one visual state.

   Storybook automatically creates interactive documentation.

   Use this file to verify

   • Different layouts
   • Header
   • Footer
   • Theme switching
   • Responsiveness
   • Component behaviour

   Each story represents a realistic use case.
============================================================================ */

const meta: Meta<typeof Card> = {
  title: "Components/Card",
  component: Card,
  tags: ["autodocs"],

  args: {
    title: "Student Information",
    padded: true,
    shadow: true,
  },

  argTypes: {
    padded: {
      control: "boolean",
    },

    shadow: {
      control: "boolean",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Card>;

/* ============================================================================
   Default
============================================================================ */

export const Default: Story = {
  render: (args) => (
    <Card {...args}>
      <p>
        This is a reusable Card component used to
        display grouped information.
      </p>
    </Card>
  ),
};

/* ============================================================================
   Without Header
============================================================================ */

export const WithoutHeader: Story = {
  args: {
    title: undefined,
  },

  render: (args) => (
    <Card {...args}>
      <p>
        This card does not contain a title.
      </p>
    </Card>
  ),
};

/* ============================================================================
   With Footer
============================================================================ */

export const WithFooter: Story = {
  args: {
    footer: (
      <div className="flex justify-end">
        <Button>Save Changes</Button>
      </div>
    ),
  },

  render: (args) => (
    <Card {...args}>
      <p>
        This card includes a footer with an action button.
      </p>
    </Card>
  ),
};

/* ============================================================================
   Without Shadow
============================================================================ */

export const WithoutShadow: Story = {
  args: {
    shadow: false,
  },

  render: (args) => (
    <Card {...args}>
      <p>
        Shadow has been disabled for this card.
      </p>
    </Card>
  ),
};

/* ============================================================================
   Without Padding
============================================================================ */

export const WithoutPadding: Story = {
  args: {
    padded: false,
  },

  render: (args) => (
    <Card {...args}>
      <div className="bg-primary p-6 text-white">
        Padding is disabled.
      </div>
    </Card>
  ),
};

/* ============================================================================
   Dashboard Card
============================================================================ */

export const DashboardCard: Story = {
  args: {
    title: "Course Progress",
  },

  render: (args) => (
    <Card
      {...args}
      footer={
        <Button variant="primary">
          View Details
        </Button>
      }
    >
      <div className="space-y-2">
        <h2 className="text-3xl font-bold">
          84%
        </h2>

        <p className="text-muted">
          Overall completion
        </p>
      </div>
    </Card>
  ),
};