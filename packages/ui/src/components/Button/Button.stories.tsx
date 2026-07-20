import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

/* ============================================================================
   Button.stories — THE REFERENCE STORY
   ----------------------------------------------------------------------------
   A "story" is one rendered example of a component. Storybook collects them
   into an interactive page. Copy this file's shape for every component.

   - `meta` describes the component + which props are interactive controls.
   - Each export is one story (a preset state).
   - Use the theme toolbar in Storybook to switch themes and WATCH these
     recolor with zero code change. If a component doesn't recolor, it has a
     hardcoded color — that's a bug.
   ========================================================================= */

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"], // generates a docs page automatically
  args: {
    children: "Click me",
    variant: "primary",
    size: "md",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "ghost", "danger"],
    },
    size: { control: "select", options: ["sm", "md", "lg"] },
    isLoading: { control: "boolean" },
    disabled: { control: "boolean" },
  },
};
export default meta;

type Story = StoryObj<typeof Button>;

/* One story per meaningful state. */
export const Primary: Story = {};

export const Secondary: Story = { args: { variant: "secondary" } };

export const Ghost: Story = { args: { variant: "ghost" } };

export const Danger: Story = { args: { variant: "danger", children: "Delete" } };

export const Loading: Story = { args: { isLoading: true, children: "Saving" } };

export const Disabled: Story = { args: { disabled: true } };

/* A story showing all variants together — handy for visual review. */
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="danger">Danger</Button>
    </div>
  ),
};
