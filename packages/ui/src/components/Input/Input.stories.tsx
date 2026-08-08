import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./Input";

interface ValidationWrapperProps {
  label: string;
  type?: "text" | "email" | "password";
  placeholder: string;
  required?: boolean;
  disabled?: boolean;
}

function ValidationWrapper({
  label,
  type = "text",
  placeholder,
  required = false,
  disabled = false,
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

    if (type === "email" && input) {
      if (!emailRegex.test(input)) {
        setError("Please enter a valid email address.");
        return;
      }
    }

    if (type === "password" && input) {
      if (!passwordRegex.test(input)) {
        setError(
          "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character."
        );
        return;
      }
    }

    setError("");
  };

  return (
    <div className="flex w-96 flex-col gap-2">
      <label className="font-medium">
        {label}

        {required && (
          <span className="ml-1 text-danger">*</span>
        )}
      </label>

      <Input
        type={type}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        invalid={!!error}
        onChange={(e) => {
          setValue(e.target.value);
          validate(e.target.value);
        }}
        onBlur={(e) => validate(e.target.value)}
      />

      {error ? (
        <p className="text-sm text-danger">
          {error}
        </p>
      ) : (
        required &&
        type === "password" && (
          <p className="text-sm text-muted">
            Password must contain at least 8 characters,
            one uppercase letter, one lowercase letter,
            one number and one special character.
          </p>
        )
      )}
    </div>
  );
}

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
  render: () => (
    <ValidationWrapper
      label="Name"
      required
      placeholder="Enter your name"
    />
  ),
};

export const Email: Story = {
  render: () => (
    <ValidationWrapper
      label="Email"
      type="email"
      required
      placeholder="Enter your email"
    />
  ),
};

export const Password: Story = {
  render: () => (
    <ValidationWrapper
      label="Password"
      type="password"
      required
      placeholder="Enter your password"
    />
  ),
};

export const Required: Story = {
  render: () => (
    <ValidationWrapper
      label="Username"
      required
      placeholder="Enter username"
    />
  ),
};

export const Disabled: Story = {
  render: () => (
    <ValidationWrapper
      label="Disabled"
      disabled
      placeholder="Disabled input"
    />
  ),
};

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
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

      <ValidationWrapper
        label="Disabled"
        disabled
        placeholder="Disabled"
      />
    </div>
  ),
};