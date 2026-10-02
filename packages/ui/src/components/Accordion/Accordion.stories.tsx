import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Accordion, type AccordionProps } from "./Accordion";

const items = [
  { value: "start", heading: "How do I get started?", content: <p>Choose a topic, read the introduction, and complete the practice exercises.</p> },
  { value: "resources", heading: "Where can I find additional resources and detailed reference material?", content: <a href="#resources">Browse the resource library</a> },
  { value: "support", heading: "How can I ask for help?", content: <p>Use your discussion group to ask questions and compare approaches.</p> },
];
const meta = { title: "Components/Accordion", component: Accordion, tags: ["autodocs"], args: { items } } satisfies Meta<typeof Accordion>;
export default meta;
type Story = StoryObj<typeof meta>;
export const SingleOpen: Story = { args: { defaultValue: ["start"] } };
function ControlledAccordion(props: AccordionProps) {
  const [value, setValue] = useState(["start", "resources"]);
  return <Accordion {...props} value={value} onValueChange={setValue} />;
}
export const MultipleOpen: Story = { args: { multiple: true }, render: args => <ControlledAccordion {...args} /> };
export const DisabledItem: Story = { args: { items: items.map(item => ({ ...item, disabled: item.value === "resources" })) } };
