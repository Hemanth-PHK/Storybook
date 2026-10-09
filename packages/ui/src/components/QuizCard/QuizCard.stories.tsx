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
// Assessment state belongs to the parent. This is a local demo response, not scoring in QuizCard.
function AssessmentExample(args: QuizCardProps) {
  const [selected, setSelected] = useState<string>();
  const [validation, setValidation] = useState<string>();
  const [status, setStatus] = useState<"correct" | "incorrect">();
  const [loading, setLoading] = useState(false);
  const pending = useRef(false);
  const retryRef = useRef<HTMLButtonElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const submit = async () => {
    if (pending.current || status || args.disabled) return;
    if (!selected) {
      setValidation("Select an answer to continue.");
      cardRef.current?.querySelector<HTMLInputElement>("input:not(:disabled)")?.focus();
      return;
    }
    pending.current = true;
    setLoading(true);
    // Simulates an assessment response; the correct answer is not passed to QuizCard.
    await new Promise(resolve => setTimeout(resolve, 600));
    setStatus(selected === "button" ? "correct" : "incorrect");
    setLoading(false);
    pending.current = false;
  };
  useEffect(() => {
    if (status === "incorrect") retryRef.current?.focus();
  }, [status]);
  return <div ref={cardRef}><QuizCard {...args} selectedOptionId={selected}
    onOptionChange={optionId => { setSelected(optionId); setValidation(undefined); args.onOptionChange(optionId); }}
    validationMessage={validation} answerStatus={status} disabled={args.disabled || loading || !!status}
    feedback={loading ? "Submitting answer..." : status === "incorrect" ? "Incorrect answer. Try again." : status === "correct" ? "Correct answer." : undefined}
    explanation={status === "correct" ? "A button is an interactive form control." : undefined}
    nextAction={status === "incorrect" ? <Button ref={retryRef} type="button" className="bg-primary text-on-primary" onClick={() => {
      setStatus(undefined);
      // Preserve the previous answer so learners can review and change it.
      requestAnimationFrame(() => cardRef.current?.querySelector<HTMLInputElement>("input:checked")?.focus());
    }}>Retry</Button> : <Button type="button" className="bg-primary text-on-primary" loading={loading}
      disabled={args.disabled || status === "correct"} onClick={submit}>{status === "correct" ? "Answer finalized" : "Submit answer"}</Button>}
  /></div>;
}
export const ValidationError: Story = { render: args => <AssessmentExample {...args} /> };
export const CorrectFeedback: Story = { render: args => <AssessmentExample {...args} /> };
export const IncorrectFeedback: Story = { render: args => <AssessmentExample {...args} /> };
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
