import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Nav } from "./Nav";
import { ThemeSwitcher } from "../ThemeSwitcher/ThemeSwitcher";

const meta: Meta<typeof Nav> = {
  title: "Components/Nav", component: Nav,
  parameters: { layout: "fullscreen" },
};
export default meta;

const PAGES = {
  "/dashboard": { label: "Dashboard", body: "Dashboard content" },
  "/courses": { label: "Courses", body: "Courses content" },
  "/progress": { label: "Progress", body: "Progress content" },
} as const;

type PathKey = keyof typeof PAGES;

const LINKS = (Object.keys(PAGES) as PathKey[]).map((href) => ({
  label: PAGES[href].label,
  href,
}));


export const WithThemeSwitcher: StoryObj<typeof Nav> = {
  render: function InteractiveNav() {
    const [currentPath, setCurrentPath] = useState<PathKey>("/dashboard");
    const page = PAGES[currentPath];

    return (
      <div className="bg-bg">
        <Nav
          brand="LearnHub"
          links={LINKS}
          currentPath={currentPath}
          onNavigate={(link, event) => {
            event.preventDefault();
            setCurrentPath(link.href as PathKey);
          }}
          actions={<ThemeSwitcher />}
        />

       
        <div className="mx-auto max-w-6xl p-6">
          <h1 className="text-xl font-semibold text-text">{page.label}</h1>
          <p className="mt-2 text-muted">{page.body}</p>
        </div>
      </div>
    );
  },
};