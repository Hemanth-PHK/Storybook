import type { Meta, StoryObj } from "@storybook/react";
import { Nav } from "./Nav";
import { ThemeSwitcher } from "../ThemeSwitcher/ThemeSwitcher";

const meta: Meta<typeof Nav> = {
  title: "Components/Nav", component: Nav,
  parameters: { layout: "fullscreen" },
};
export default meta;

// The ticket's feature, assembled: Nav + ThemeSwitcher.
export const WithThemeSwitcher = {
  args: {
    brand: "LearnHub",
    links: [
      { label: "Dashboard", href: "#", active: true },
      { label: "Courses", href: "#" },
      { label: "Progress", href: "#" },
    ],
    actions: <ThemeSwitcher />,
  },
};