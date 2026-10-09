import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../Button";
import { EmptyState } from "./EmptyState";

const meta = {
  title: "Components/EmptyState",
  component: EmptyState,
  tags: ["autodocs"],
  args: {
    title: "No lessons yet",
    description: "Lessons will appear here when they are added.",
  },
} satisfies Meta<typeof EmptyState>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {};
export const WithAction: Story = {
  args: {
    icon: (
      <svg aria-hidden="true" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 5h7l2 2h9v13H3z" />
      </svg>
    ),
    action: <Button type="button" className="bg-primary text-on-primary">Add a lesson</Button>,
  },
};

export const NoEnrolledCourses: Story = { args: { title: "No enrolled courses", description: "Browse courses to start learning.", action: <Button type="button" className="bg-primary text-on-primary">Browse courses</Button> } };
export const NoSavedCourses: Story = { args: { title: "No saved courses", description: "Save a course to find it here later." } };
export const NoSearchResults: Story = { args: { title: "No search results", description: "Try another topic or remove a filter." } };
export const TitleOnly: Story = { args: { title: "No courses yet", description: undefined } };
export const LongContent: Story = { args: { title: "NoMatchingCourses".repeat(20), description: "SearchDescription".repeat(50) } };
