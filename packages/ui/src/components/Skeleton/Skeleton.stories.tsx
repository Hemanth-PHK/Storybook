import type { Meta, StoryObj } from "@storybook/react";

import { Skeleton } from "./Skeleton";
import { Card } from "../Card";


const meta: Meta<typeof Skeleton> = {
  title: "Components/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],

  args: {
    variant: "text",
    animated: true,
  },

  argTypes: {
    variant: {
      control: "select",
      options: ["text", "avatar", "rect"],
    },

    animated: {
      control: "boolean",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Skeleton>;

/* 
   Text
*/

export const Text: Story = {
  render: (args) => (
    <Skeleton {...args} width="250px" />
  ),
};

/* 
   Avatar
 */

export const Avatar: Story = {
  args: {
    variant: "avatar",
  },
};

/* 
   Rectangle
 */

export const Rectangle: Story = {
  args: {
    variant: "rect",
    width: "100%",
    height: "120px",
  },
};

/* 
   Card Loading
 */

export const CardLoading: Story = {
  render: () => (
    <Card title="Loading">
      <div className="space-y-4">
        <Skeleton width="40%" />

        <Skeleton />

        <Skeleton width="90%" />

        <Skeleton width="60%" />

        <Skeleton
          variant="rect"
          height="120px"
        />
      </div>
    </Card>
  ),
};

/* 
   Profile Loading
*/

export const ProfileLoading: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Skeleton variant="avatar" />

      <div className="flex-1 space-y-2">
        <Skeleton width="160px" />

        <Skeleton width="220px" />
      </div>
    </div>
  ),
};

/* 
   Dashboard Loading
 */

export const DashboardLoading: Story = {
  render: () => (
    <div className="space-y-6">
      <Skeleton
        variant="rect"
        height="180px"
      />

      <div className="grid grid-cols-3 gap-4">
        <Skeleton
          variant="rect"
          height="120px"
        />

        <Skeleton
          variant="rect"
          height="120px"
        />

        <Skeleton
          variant="rect"
          height="120px"
        />
      </div>
    </div>
  ),
};
/* 
   Image Loading
*/

export const ImageLoading: Story = {
  render: () => (
    <div className="space-y-4 max-w-sm">
      <Skeleton
        variant="rect"
        width="100%"
        height="220px"
      />

      <Skeleton width="70%" />

      <Skeleton width="45%" />
    </div>
  ),
};

/* 
   Video Loading
*/

export const VideoLoading: Story = {
  render: () => (
    <div className="space-y-4">
      <Skeleton
        variant="rect"
        width="100%"
        height="250px"
      />

      <Skeleton width="60%" />

      <Skeleton width="90%" />

      <Skeleton width="75%" />
    </div>
  ),
};