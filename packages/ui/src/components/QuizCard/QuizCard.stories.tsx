import { useEffect, useRef, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "../Button";
import { QuizCard, type QuizCardProps } from "./QuizCard";

function InteractiveQuiz(args: QuizCardProps) {
  const [selectedOptionId, setSelectedOptionId] = useState(args.selectedOptionId);
  useEffect(() => setSelectedOptionId(args.selectedOptionId), [args.selectedOptionId]);
  return <QuizCard {...args} selectedOptionId={selectedOptionId} onOptionChange={optionId => { setSelectedOptionId(optionId); args.onOptionChange(optionId); }} />;
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
  args: { selectedOptionId: "button", feedback: <p className="text-success">Correct answer</p>, nextAction: <Button type="button" className="bg-primary text-on-primary">Next question</Button> },
};
export const IncorrectFeedback: Story = {
  args: { selectedOptionId: "section", feedback: <p className="text-danger">Try again</p> },
};
export const WithExplanation: Story = {
  args: { selectedOptionId: "button", explanation: "A button is an interactive form control." },
};

export const Disabled: Story = { args: { disabled: true, selectedOptionId: "button" } };
export const DisabledOption: Story = { args: { options: [{ id: "button", label: "Button", disabled: true }, { id: "section", label: "Section" }] } };
export const LongContent: Story = { args: { question: "Consider a course assessment with a lengthy description. ".repeat(12), options: [{ id: "long", label: "UnbrokenContent".repeat(35) }, { id: "short", label: "Another answer" }] } };
function SubmissionExample(args: QuizCardProps) {
  const [selected, setSelected] = useState<string>();
  const [submitted, setSubmitted] = useState(false);
  const submittedRef = useRef(false);
  return <QuizCard {...args} selectedOptionId={selected} onOptionChange={setSelected} disabled={submitted}
    feedback={submitted ? "Answer submitted for assessment." : undefined}
    nextAction={<Button type="button" className="bg-primary text-on-primary" disabled={!selected || submitted} onClick={() => {
      if (!selected || submittedRef.current) return;
      submittedRef.current = true;
      setSubmitted(true);
    }}>Submit answer</Button>} />;
}
export const Submission: Story = { render: args => <SubmissionExample {...args} /> };
