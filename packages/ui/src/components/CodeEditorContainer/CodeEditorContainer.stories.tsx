import type { Meta, StoryObj } from "@storybook/react";

import { CodeEditorContainer } from "./CodeEditorContainer";

const meta: Meta<typeof CodeEditorContainer> = {
  title: "Components/CodeEditorContainer",
  component: CodeEditorContainer,
  tags: ["autodocs"],

  args: {
    value: "",
    language: "JavaScript",
    languages: [
      "JavaScript",
      "Python",
      "Java",
      "C",
      "C++",
    ],
    onChange: () => {},
    onLanguageChange: () => {},
    onRun: () => {},
    onSubmit: () => {},
  },

  argTypes: {
    value: {
      control: "text",
    },
    language: {
      control: "select",
      options: [
        "JavaScript",
        "Python",
        "Java",
        "C",
        "C++",
      ],
    },
    languages: {
      control: "object",
    },
    running: {
      control: "boolean",
    },
    submitting: {
      control: "boolean",
    },
    readOnly: {
      control: "boolean",
    },
    consoleContent: {
      control: false,
    },
    testCases: {
      control: false,
    },
    verdict: {
      control: false,
    },
    onChange: {
      action: "code changed",
    },
    onLanguageChange: {
      action: "language changed",
    },
    onRun: {
      action: "run clicked",
    },
    onSubmit: {
      action: "submit clicked",
    },
  },
};

export default meta;

type Story = StoryObj<typeof CodeEditorContainer>;

export const Default: Story = {
  args: {
    value: "",
  },
};

export const WithCode: Story = {
  args: {
    value: `function add(a, b) {
  return a + b;
}

console.log(add(2, 3));`,
    language: "JavaScript",
  },
};

export const Running: Story = {
  args: {
    value: `function add(a, b) {
  return a + b;
}`,
    running: true,
    consoleContent: "Running test cases...",
  },
};

export const WithTestCases: Story = {
  args: {
    value: `function add(a, b) {
  return a + b;
}`,
    testCases: (
      <div className="space-y-2">
        <div>
          <span className="font-medium text-text">
            Test 1
          </span>
          <span className="ml-2 text-success">
            Passed
          </span>
        </div>

        <div>
          <span className="font-medium text-text">
            Test 2
          </span>
          <span className="ml-2 text-success">
            Passed
          </span>
        </div>

        <div>
          <span className="font-medium text-text">
            Test 3
          </span>
          <span className="ml-2 text-danger">
            Failed
          </span>
        </div>
      </div>
    ),
  },
};

export const WithVerdict: Story = {
  args: {
    value: `function add(a, b) {
  return a + b;
}`,
    consoleContent: "Execution completed.",
    testCases: (
      <div className="text-text">
        3 / 3 tests passed
      </div>
    ),
    verdict: (
      <div className="space-y-1">
        <p className="font-semibold text-success">
          Accepted
        </p>
        <p className="text-muted">
          All test cases passed.
        </p>
      </div>
    ),
  },
};

export const ReadOnly: Story = {
  args: {
    value: `function add(a, b) {
  return a + b;
}`,
    readOnly: true,
  },
};