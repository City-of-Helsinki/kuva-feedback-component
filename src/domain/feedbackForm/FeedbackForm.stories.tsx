import React from "react";
import { withKnobs, select } from "@storybook/addon-knobs";
import {
  Props,
  Stories,
  Subtitle,
  Title,
} from "@storybook/addon-docs/dist/blocks";

import FeedbackForm from "./FeedbackForm";

export default {
  component: FeedbackForm,
  title: "Feedback Form",
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

export const Default = () => <FeedbackForm locale="fi" />;

export const Playground = () => {
  const locale = select(
    "Locale",
    {
      Undefined: undefined,
      Finnish: "fi",
      Swedish: "sv",
      English: "en",
    },
    undefined
  );

  return <FeedbackForm locale={locale} />;
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
