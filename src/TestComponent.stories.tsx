import React from "react";
import { withKnobs } from "@storybook/addon-knobs";
import {
  Props,
  Stories,
  Subtitle,
  Title,
} from "@storybook/addon-docs/dist/blocks";

import TestComponent from "./TestComponent";

export default {
  component: TestComponent,
  title: "test-component",
  decorators: [
    withKnobs,
    (storyFn) => <div style={{ maxWidth: "400px" }}>{storyFn()}</div>,
  ],
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

export const Default = () => <TestComponent />;

export const Playground = () => {
  return <TestComponent />;
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
