import type { Meta, StoryObj } from "@storybook/react";
import { ProgressBar } from "./ProgressBar";

const meta = {
  title: "Components/ProgressBar",
  component: ProgressBar,
  tags: ["autodocs"],
  args: { value: 45, showValue: false },
  argTypes: {
    value: { control: { type: "range", min: 0, max: 100, step: 1 } },
    showValue: { control: "boolean" },
  },
  decorators: [(Story) => <div className="w-full max-w-md"><Story /></div>],
} satisfies Meta<typeof ProgressBar>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithLabel: Story = { args: { label: "Learning progress", showValue: true } };
export const Completed: Story = { args: { value: 100, label: "Learning progress", showValue: true } };

export const Milestones: Story = { render: () => <div className="space-y-4">{[0,25,50,75,100].map(value => <ProgressBar key={value} value={value} label={`Course completion ${value}`} showValue />)}</div> };
export const InvalidValues: Story = { render: () => <div className="space-y-4">{[-10,150,NaN,Infinity,-Infinity].map((value,index) => <ProgressBar key={index} value={value} label={String(value)} showValue />)}</div> };
export const LongLabel: Story = { args: { label: "CourseCompletion".repeat(40), showValue: true } };
