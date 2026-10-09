import type { Meta, StoryObj } from "@storybook/react";
import { Avatar } from "./Avatar";

// A self-contained illustration keeps this example independent of external hosts.
const imageSrc = `data:image/svg+xml,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96"><rect width="96" height="96" fill="none"/><circle cx="48" cy="34" r="17" fill="currentColor"/><path d="M15 96v-9a33 33 0 0 1 66 0v9" fill="currentColor"/></svg>',
)}`;

const meta = {
  title: "Components/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  args: { name: "Ramesh Goud", alt: "Ramesh Goud", size: "md" },
  argTypes: { size: { control: "select", options: ["sm", "md", "lg"] } },
} satisfies Meta<typeof Avatar>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Image: Story = { args: { src: imageSrc } };
export const InitialsFallback: Story = {};
export const BrokenImageFallback: Story = {
  args: { src: "data:image/png;base64,broken-image" },
};
export const AllSizes: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-end gap-6">
      {(["sm", "md", "lg"] as const).map((size) => (
        <div key={size} className="flex flex-col items-center gap-2">
          <Avatar {...args} size={size} />
          <span className="text-sm text-muted">{size}</span>
        </div>
      ))}
    </div>
  ),
};

export const LongName: Story = { args: { name: "Alexandria Very Long Learner Name", alt: "Alexandria Very Long Learner Name" } };
export const Decorative: Story = { args: { alt: "" } };
export const BlankName: Story = { args: { name: " ", alt: "Learner profile" } };
export const ProfileHeader: Story = { render: args => <div className="flex items-center gap-3"><Avatar {...args} /><span className="min-w-0 [overflow-wrap:anywhere]">Alexandria Very Long Learner Name</span></div> };
