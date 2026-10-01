import type { Meta, StoryObj } from "@storybook/react";
import { VideoPlayerContainer } from "./VideoPlayerContainer";

const src =
  "https://archive.org/download/BigBuckBunny_328/BigBuckBunny_512kb.mp4";

const captions = [
  {
    src: "/captions/skillforge-demo.en.vtt",
    srcLang: "en",
    label: "English",
    default: true,
  },
];

const meta = {
  title: "Components/VideoPlayerContainer",
  component: VideoPlayerContainer,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  decorators: [
    (Story) => (
      <div className="w-[min(90vw,900px)]">
        <Story />
      </div>
    ),
  ],
  args: {
    src,
    title: "SkillForge Video Lesson",
  },
} satisfies Meta<typeof VideoPlayerContainer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithCaptions: Story = {
  args: { captions },
};

export const ResumeAvailable: Story = {
  args: { initialPosition: 60 },
};

export const Completed: Story = {
  args: {
    onComplete: () => console.info("Video completed"),
  },
};

export const Unavailable: Story = {
  args: { unavailable: true },
};

export const WithQualityAndLanguage: Story = {
  args: {
    qualities: [{ label: "Original", src }],
    languages: [{ label: "Original audio", src }],
  },
};

export const FullDemo: Story = {
  args: {
    captions,
    initialPosition: 30,
    qualities: [{ label: "Original", src }],
    languages: [{ label: "Original audio", src }],
    onProgress: (time, duration) =>
      console.info("Progress:", time, duration),
    onResume: (time) => console.info("Resumed:", time),
    onComplete: () => console.info("Completed"),
  },
};