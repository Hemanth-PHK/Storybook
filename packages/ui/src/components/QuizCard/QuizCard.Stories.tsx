import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "../Button";
import { QuizCard, type QuizCardProps } from "./QuizCard";

function InteractiveQuiz(args: QuizCardProps) {
  const [selectedOptionId, setSelectedOptionId] = useState(args.selectedOptionId);
  return <QuizCard {...args} selectedOptionId={selectedOptionId} onOptionChange={setSelectedOptionId} />;
}

const meta = {
  title: "Components/QuizCard",
  component: QuizCard,
  tags: ["autodocs"],
  render: (args) => <InteractiveQuiz {...args} />,
  args: {
    question: "Which element represents a form control?",
    options: [
      { id: "button", label: "Button" },
      { id: "section", label: "Section" },
      { id: "article", label: "Article" },
    ],
    onOptionChange: () => {},
  },
} satisfies Meta<typeof QuizCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const AnswerSelected: Story = { args: { selectedOptionId: "button" } };
export const ValidationError: Story = { args: { validationMessage: "Select an answer to continue." } };
export const CorrectFeedback: Story = {
  args: { selectedOptionId: "button", feedback: <p className="text-success">Correct answer</p>, nextAction: <Button>Next question</Button> },
};
export const IncorrectFeedback: Story = {
  args: { selectedOptionId: "section", feedback: <p className="text-danger">Try again</p> },
};
export const WithExplanation: Story = {
  args: { selectedOptionId: "button", explanation: "A button is an interactive form control." },
};
