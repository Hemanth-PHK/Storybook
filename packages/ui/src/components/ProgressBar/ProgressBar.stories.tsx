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
