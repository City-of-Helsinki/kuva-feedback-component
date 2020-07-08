import React from "react";
import { withKnobs, select, object } from "@storybook/addon-knobs";
import {
  Props,
  Stories,
  Subtitle,
  Title,
} from "@storybook/addon-docs/dist/blocks";
import { action } from "@storybook/addon-actions";

import hdsTheme from "../hdsTheme/hdsTheme";
import FeedbackComponent from "./FeedbackComponent";

// Sourced from https://dev.hel.fi/open311-test/v1/discovery.json
const TEST_OPEN_311_API_KEY = "f1301b1ded935eabc5faa6a2ce975f6";

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

export const Default = () => {
  const backendConfig = object("Backend Config", {
    apiKey: TEST_OPEN_311_API_KEY,
    url: "https://dev.hel.fi/open311-test",
    // Other issue to be fixed
    serviceCode: "180",
  });

  return <FeedbackComponent locale="fi" backendConfig={backendConfig} />;
};

export const CustomBackend = () => {
  const handleSubmit = (values) => {
    action("onSubmit")(values);

    return Promise.resolve();
  };

  return <FeedbackComponent locale="fi" onSubmit={handleSubmit} />;
};

export const SubmitError = () => (
  <FeedbackComponent
    locale="fi"
    onSubmit={() => Promise.reject(new Error("Server error"))}
  />
);

export const SubmitSuccess = () => (
  <FeedbackComponent locale="fi" onSubmit={() => Promise.resolve()} />
);

export const PreFilled = () => (
  <FeedbackComponent
    locale="fi"
    onSubmit={() => Promise.resolve()}
    initialValues={{
      title: "Title of feedback",
      description: "Content of feedback",
      firstName: "Alessa",
      lastName: "Marvina Gutierrez",
    }}
  />
);

const customTheme = {
  ...hdsTheme,
  Page: (props) => (
    <div
      {...props}
      style={{
        fontFamily: '"Comic Sans MS", cursive, sans-serif',
      }}
    />
  ),
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  TextInput: ({ labelText, helperText = "", invalid, ...rest }) => (
    <>
      <label htmlFor={rest.id}>{labelText}</label>
      <input type="text" {...rest} />
    </>
  ),
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  TextArea: ({ labelText, helperText = "", invalid, ...rest }) => (
    <>
      <label htmlFor={rest.id}>{labelText}</label>
      <textarea {...rest} />
    </>
  ),
};

const themes = {
  hds: hdsTheme,
  custom: customTheme,
};

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
  const theme = select(
    "Theme",
    {
      HDS: "hds",
      Custom: "custom",
    },
    "hds"
  );

  return (
    <FeedbackComponent
      locale={locale}
      onSubmit={() => Promise.resolve()}
      theme={themes[theme]}
    />
  );
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
