import type { Meta, StoryObj } from "@storybook/react";
import { ThemeSwitcher } from "./ThemeSwitcher";

const meta: Meta<typeof ThemeSwitcher> = {
  title: "Theme/ThemeSwitcher",
  component: ThemeSwitcher,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Click the palette icon to pick a theme. The entire Storybook " +
          "canvas recolors — same mechanism as the real app.",
      },
    },
  },
  // Give the switcher room to open its dropdown in the preview.
  decorators: [
    (Story) => (
      <div className="flex min-h-[240px] justify-end p-4">
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof ThemeSwitcher>;

export const Default: Story = {};
