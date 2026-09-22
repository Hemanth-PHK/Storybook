import { useState, type ComponentProps } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "../Button";
import { Drawer } from "./Drawer";

const meta: Meta<typeof Drawer> = {
  title: "Components/Drawer",
  component: Drawer,
  tags: ["autodocs"],

  parameters: {
    layout: "fullscreen",
  },

  args: {
    title: "Drawer Title",
    description: "This is a reusable drawer component.",
    closeOnOverlayClick: true,
  },

  argTypes: {
    side: {
      control: "select",
      options: ["left", "right", "bottom"],
    },

    open: {
      control: "boolean",
    },

    closeOnOverlayClick: {
      control: "boolean",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Drawer>;

function DrawerDemo(props: ComponentProps<typeof Drawer>) {
  const [open, setOpen] = useState(false);

  return (
    <div className="p-8">
      <Button onClick={() => setOpen(true)}>
        Open Drawer
      </Button>

      <Drawer
        {...props}
        open={open}
        onOpenChange={setOpen}
        footer={
          <div className="flex justify-end gap-3">
            <Button onClick={() => setOpen(false)}>
              Cancel
            </Button>

            <Button onClick={() => setOpen(false)}>
              Save
            </Button>
          </div>
        }
      >
        <div className="space-y-4">
          <p>
            This is the drawer content. You can place forms,
            navigation, filters, or other content here.
          </p>

          <p>
            The drawer supports keyboard focus management,
            Escape-to-close, overlay closing, and background
            scroll locking.
          </p>
        </div>
      </Drawer>
    </div>
  );
}

export const Left: Story = {
  args: {
    side: "left",
  },

  render: (args) => <DrawerDemo {...args} />,
};

export const Right: Story = {
  args: {
    side: "right",
  },

  render: (args) => <DrawerDemo {...args} />,
};

export const Bottom: Story = {
  args: {
    side: "bottom",
  },

  render: (args) => <DrawerDemo {...args} />,
};