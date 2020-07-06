import React from "react";
import { withKnobs, select } from "@storybook/addon-knobs";
import {
  Props,
  Stories,
  Subtitle,
  Title,
} from "@storybook/addon-docs/dist/blocks";

import FeedbackComponent from "./FeedbackComponent";

export default {
  component: FeedbackComponent,
  title: "Feedback component",
  decorators: [withKnobs, (storyFn) => <div>{storyFn()}</div>],
  parameters: {
    docs: {
      page: () => (
        <>
          <Title>Props</Title>
          <Subtitle>
            Props, which are not mentioned below, are passed to the native
            element
          </Subtitle>
          <Props />
          <Stories title="Examples" includePrimary />
        </>
      ),
    },
  },
};

export const Default = () => <FeedbackComponent locale="fi" />;

export const Playground = () => {
  const locale = select(
    "Locale",
    {
      Finnish: "fi",
      Swedish: "sv",
      English: "en",
    },
    "fi"
  );

  return <FeedbackComponent locale={locale} />;
};

Playground.story = {
  parameters: {
    previewTabs: {
      "storybook/docs/panel": {
        hidden: true,
      },
    },
    docs: {
      disable: true,
    },
  },
};
