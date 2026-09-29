import type { Meta, StoryObj } from "@storybook/react";
import { VideoPlayerContainer } from "./VideoPlayerContainer";

const meta: Meta<typeof VideoPlayerContainer> = {
  title: "Components/VideoPlayerContainer",
  component: VideoPlayerContainer,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },

  argTypes: {
    onProgress: {
      table: {
        disable: true,
      },
    },

    onResume: {
      table: {
        disable: true,
      },
    },

    onComplete: {
      table: {
        disable: true,
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof VideoPlayerContainer>;

/* Full Big Buck Bunny video */

const videoSrc =
  "https://archive.org/download/BigBuckBunny_328/BigBuckBunny_512kb.mp4";

/* Captions */

const captions = [
  {
    src: "https://raw.githubusercontent.com/mdn/learning-area/main/html/multimedia-and-embedding/video-and-audio-content/rabbit.vtt",
    srcLang: "en",
    label: "English",
    default: true,
  },
];

/* Quality options */

const qualities = [
  {
    label: "240p",
    src: videoSrc,
  },

  {
    label: "360p",
    src: videoSrc,
  },

  {
    label: "720p",
    src: videoSrc,
  },
];

/* Language options */

const languages = [
  {
    label: "English",
    src: videoSrc,
  },

  {
    label: "Spanish",
    src: videoSrc,
  },
];

/* Default */

export const Default: Story = {
  args: {
    src: videoSrc,
    title: "Big Buck Bunny",
  },
};

/* With Captions */

export const WithCaptions: Story = {
  args: {
    src: videoSrc,
    title: "Big Buck Bunny with Captions",
    captions,
  },
};

/* Resume Available */

export const ResumeAvailable: Story = {
  args: {
    src: videoSrc,
    title: "Big Buck Bunny - Resume",
    initialPosition: 60,

    onResume: (currentTime) => {
      console.log(
        "Video resumed at:",
        currentTime,
      );
    },

    onProgress: (
      currentTime,
      duration,
    ) => {
      console.log(
        "Progress:",
        currentTime,
        "/",
        duration,
      );
    },
  },
};

/* Completed */

export const Completed: Story = {
  args: {
    src: videoSrc,
    title: "Big Buck Bunny - Completed",

    onComplete: () => {
      console.log(
        "Big Buck Bunny completed",
      );
    },
  },
};

/* Unavailable */

export const Unavailable: Story = {
  args: {
    src: videoSrc,
    title: "Big Buck Bunny - Unavailable",
    unavailable: true,
  },
};

/* Quality and Language */

export const WithQualityAndLanguage: Story = {
  args: {
    src: videoSrc,
    title:
      "Big Buck Bunny - Quality and Language",
    qualities,
    languages,
  },
};

/* Full Demo */

export const FullDemo: Story = {
  args: {
    src: videoSrc,
    title: "Big Buck Bunny - Full Demo",

    captions,

    qualities,

    languages,

    initialPosition: 0,

    onResume: (currentTime) => {
      console.log(
        "Resume:",
        currentTime,
      );
    },

    onProgress: (
      currentTime,
      duration,
    ) => {
      console.log(
        "Progress:",
        currentTime,
        "/",
        duration,
      );
    },

    onComplete: () => {
      console.log(
        "Big Buck Bunny completed",
      );
    },
  },
};

