import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Breadcrumb, type BreadcrumbProps } from "./Breadcrumb";

const items = [
  { id: "home", label: "Home", href: "#home" },
  { id: "library", label: "Library", href: "#library" },
  { id: "guide", label: "Study guide" },
];
function InteractiveBreadcrumb(props: BreadcrumbProps) {
  const [message, setMessage] = useState("Select a breadcrumb to preview navigation.");
  return <><Breadcrumb {...props} items={props.items.map(item => ({ ...item, onClick: item.href ? event => { event.preventDefault(); setMessage(`Selected ${item.id}`); } : item.onClick }))} /><p role="status" className="mt-4 text-sm text-muted">{message}</p></>;
}
const meta = { title: "Components/Breadcrumb", component: Breadcrumb, tags: ["autodocs"], args: { items }, render: args => <InteractiveBreadcrumb {...args} /> } satisfies Meta<typeof Breadcrumb>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Basic: Story = {};
export const CollapsedLongPath: Story = { args: { maxItems: 3, items: [items[0], items[1], { id: "science", label: "Science", href: "#science" }, { id: "physics", label: "Physics", href: "#physics" }, { id: "motion", label: "Motion and forces", href: "#motion" }, items[2]] } };
export const CurrentPage: Story = { args: { separator: "›", items: [items[0], items[1], { ...items[2], href: "#guide", current: true }] } };
