import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { FormField } from "./FormField";
import { Input } from "../Input";

interface ValidationWrapperProps {
  label: string;
  type?: "text" | "email" | "password";
  placeholder: string;
  required?: boolean;
}

function ValidationWrapper({
  label,
  type = "text",
  placeholder,
  required = false,
}: ValidationWrapperProps) {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  const emailRegex =
    /^[A-Za-z0-9!#$%&'*+/=?^_{|}~-]+(?:\.[A-Za-z0-9!#$%&'*+/=?^_{|}~-]+)*@(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?\.)+[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?$/;

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

  const nameRegex = /^[A-Za-z\s'-]+$/;

  const validate = (input: string) => {
    // Name validation (text fields)
    if (type === "text") {
      if (required && !input.trim()) {
        setError("Name is required");
        return;
      }
      if (input && input.trim().length < 2) {
        setError("Name must be at least 2 characters");
        return;
      }
      if (input && input.trim().length > 50) {
        setError("Name must be under 50 characters");
        return;
      }
      if (input && !nameRegex.test(input)) {
        setError("Name can only contain letters, spaces, hyphens, and apostrophes");
        return;
      }
    }

    // Required check for non-text fields
    if (required && !input.trim()) {
      setError(`${label} is required`);
      return;
    }

    // Email validation
    if (type === "email" && input && !emailRegex.test(input)) {
      setError("Please enter a valid email address.");
      return;
    }

    // Password validation
    if (type === "password" && input && !passwordRegex.test(input)) {
      setError(
        "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character."
      );
      return;
    }

    setError("");
  };

  return (
    <FormField
      id={label.toLowerCase()}
      label={label}
      required={required}
      error={error || undefined}
      helperText={
        !error && type === "password"
          ? "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character."
          : undefined
      }
    >
      <Input
        type={type}
        placeholder={placeholder}
        value={value}
        invalid={!!error}
        onChange={(e) => {
          setValue(e.target.value);
          validate(e.target.value);
        }}
        onBlur={(e) => validate(e.target.value)}
      />
    </FormField>
  );
}

const meta: Meta<typeof FormField> = {
  title: "Components/FormField",
  component: FormField,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof FormField>;

export const Default: Story = {
  render: () => (
    <ValidationWrapper
      label="Name"
      required
      placeholder="Enter your name"
    />
  ),
};

export const Required: Story = {
  render: () => (
    <ValidationWrapper
      label="Email"
      required
      type="email"
      placeholder="Enter your email"
    />
  ),
};

export const HelperText: Story = {
  render: () => (
    <ValidationWrapper
      label="Password"
      type="password"
      required
      placeholder="Enter your password"
    />
  ),
};

export const Error: Story = {
  render: () => (
    <ValidationWrapper
      label="Email"
      type="email"
      required
      placeholder="Enter your email"
    />
  ),
};

export const AllStates: Story = {
  render: () => (
    <div className="flex w-96 flex-col gap-6">
      <ValidationWrapper
        label="Name"
        required
        placeholder="Enter your name"
      />

      <ValidationWrapper
        label="Email"
        type="email"
        required
        placeholder="Enter your email"
      />

      <ValidationWrapper
        label="Password"
        type="password"
        required
        placeholder="Enter your password"
      />

      <ValidationWrapper
        label="Username"
        required
        placeholder="Enter username"
      />
    </div>
  ),
};