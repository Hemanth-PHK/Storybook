import type { Meta, StoryObj } from "@storybook/react";

import { FormField } from "./FormField";
import { Input } from "../Input";

const meta: Meta<typeof FormField> = {
  title: "Components/FormField",
  component: FormField,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof FormField>;

export const Default: Story = {
  render: () => (
    <FormField
      id="email"
      label="Email"
    >
      <Input placeholder="Enter email" />
    </FormField>
  ),
};

export const Required: Story = {
  render: () => (
    <FormField
      id="email"
      label="Email"
      required
    >
      <Input placeholder="Enter email" />
    </FormField>
  ),
};

export const HelperText: Story = {
  render: () => (
    <FormField
      id="email"
      label="Email"
      helperText="We'll never share your email."
    >
      <Input placeholder="Enter email" />
    </FormField>
  ),
};

export const Error: Story = {
  render: () => (
    <FormField
      id="email"
      label="Email"
      error="Email is required."
    >
      <Input placeholder="Enter email" />
    </FormField>
  ),
};

export const AllStates: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-6">
      <FormField
        id="name"
        label="Name"
      >
        <Input placeholder="Enter name" />
      </FormField>

      <FormField
        id="email"
        label="Email"
        required
      >
        <Input placeholder="Enter email" />
      </FormField>

      <FormField
        id="password"
        label="Password"
        helperText="Minimum 8 characters"
      >
        <Input
          type="password"
          placeholder="Enter password"
        />
      </FormField>

      <FormField
        id="username"
        label="Username"
        error="Username already exists."
      >
        <Input placeholder="Enter username" />
      </FormField>
    </div>
  ),
};