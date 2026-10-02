import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Tabs, type TabsProps } from "./Tabs";

const items = [
  { value: "overview", label: "Overview", content: <p>Explore the learning resources and choose your next activity.</p> },
  { value: "resources", label: "Resources", content: <a href="#guide">Read the study guide</a> },
  { value: "discussion", label: "Discussion", content: <p>Discuss questions and share ideas with your group.</p> },
];
const meta = { title: "Components/Tabs", component: Tabs, tags: ["autodocs"], args: { items } } satisfies Meta<typeof Tabs>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
function ControlledTabs(props: TabsProps) {
  const [value, setValue] = useState("overview");
  return <Tabs {...props} value={value} onValueChange={setValue} />;
}
export const FullWidth: Story = { args: { fullWidth: true }, render: args => <ControlledTabs {...args} /> };
export const ScrollableMobile: Story = {
  parameters: { viewport: { defaultViewport: "mobile1" } },
  args: { items: [...items, { value: "assignments", label: "Assignments and feedback", content: "Review your recent assignments." }, { value: "progress", label: "Learning progress", content: "Track completed activities." }] },
};
export const DisabledTab: Story = { args: { items: items.map(item => ({ ...item, disabled: item.value === "resources" })) } };
