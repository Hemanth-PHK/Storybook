import { useState, type ComponentProps, type ReactNode } from "react";
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
    description: "Additional information can be displayed here.",
    closeOnOverlayClick: true,
  },

  argTypes: {
    side: {
      control: "select",
      options: ["left", "right", "bottom"],
    },

    open: {
      control: false,
    },

    onOpenChange: {
      control: false,
    },

    closeOnOverlayClick: {
      control: "boolean",
    },

    children: {
      control: false,
    },

    footer: {
      control: false,
    },
  },
};

export default meta;

type Story = StoryObj<typeof Drawer>;

interface DrawerDemoProps
  extends Omit<ComponentProps<typeof Drawer>, "open" | "onOpenChange"> {
  footer?: ReactNode;
}

function DrawerDemo({ footer, ...props }: DrawerDemoProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen p-4 sm:p-8">
      <Button onClick={() => setOpen(true)}>
        Open Drawer
      </Button>

      <Drawer
        {...props}
        open={open}
        onOpenChange={setOpen}
        footer={footer}
      >
        {props.children}
      </Drawer>
    </div>
  );
}

const exampleContent = (
  <div className="space-y-4">
    <p>
      Drawer content is provided by the screen that uses this
      component.
    </p>

    <p>
      It can contain filters, navigation, forms, settings, or
      other application content.
    </p>


    {Array.from({ length: 20 }, (_, index) => (
      <div key={index} className="rounded-md border border-border p-4">
        <h3 className="font-medium">
          Example Section {index + 1}
        </h3>

        <p className="mt-2 text-sm text-text/70">
          This is sample content used to verify that long Drawer content
          scrolls correctly while the header and footer remain usable.
        </p>
      </div>
    ))}

    <Button>Example Action</Button>
  </div>
);

export const Right: Story = {
  render: (args) => (
    <DrawerDemo {...args} side="right">
      {exampleContent}
    </DrawerDemo>
  ),
};

export const Left: Story = {
  render: (args) => (
    <DrawerDemo {...args} side="left">
      {exampleContent}
    </DrawerDemo>
  ),
};

export const WithFooter: Story = {
  render: (args) => (
    <DrawerDemo
      {...args}
      side="right"
      footer={
        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <Button>
            Cancel
          </Button>

          <Button>
            Apply
          </Button>
        </div>
      }
    >
      {exampleContent}
    </DrawerDemo>
  ),
};