import React from "react";
import {
  render,
  fireEvent,
  RenderResult,
  waitFor,
} from "@testing-library/react";

import FeedbackComponent, { Props } from "../FeedbackComponent";

function submitForm(renderResult: RenderResult) {
  const { getByLabelText, getByText } = renderResult;

  fireEvent.change(getByLabelText("Palaute*"), {
    target: {
      value: "Test feedback content",
    },
  });

  fireEvent.click(getByText("Lähetä palaute"));
}

describe("<FeedbackComponent />", () => {
  const defaultProps = {
    locale: "fi",
    onSubmit: () => Promise.resolve(),
  };
  const getWrapper = (props?: Partial<Props>) =>
    render(<FeedbackComponent {...defaultProps} {...props} />);
  let consoleCache;

  beforeAll(() => {
    consoleCache = global.console;
    global.console.error = jest.fn();
  });

  afterAll(() => {
    global.console = consoleCache;
  });

  it("user can input expected information", () => {
    const fields = [
      {
        label: "Otsikko",
        value: "I can't delete my profile",
      },
      {
        label: "Palaute*",
        value:
          "I use a screen reader to access the application and when I choose to delete my profile nothing happens!",
      },
      {
        label: "Etunimi tai nimimerkki",
        value: "Nikica",
      },
      {
        label: "Sukunimi",
        value: "Miletić",
      },
      {
        label: "Sähköpostiosoite",
        value: "NikicaMiletic@jourrapide.com",
      },
    ];
    const { getByLabelText, getByDisplayValue } = getWrapper();

    // Reveal all fields
    fireEvent.click(getByLabelText("Haluan vastauksen palautteeseeni"));

    fields.forEach(({ label, value }) => {
      const input = getByLabelText(label);

      fireEvent.change(input, {
        target: {
          value,
        },
      });

      expect(getByDisplayValue(value)).toBeDefined();
    });
  });

  it("user sees success view when submit succeeds", async () => {
    const renderResult = getWrapper({
      onSubmit: () => Promise.resolve(),
    });

    submitForm(renderResult);

    await waitFor(() =>
      expect(renderResult.getByText("Kiitos palautteestasi!")).toBeDefined()
    );
  });

  it("user sees error message when submit fails", async () => {
    const error = "Network error";
    const renderResult = getWrapper({
      onSubmit: () => Promise.reject(error),
    });

    submitForm(renderResult);

    await waitFor(() => {
      expect(
        renderResult.getByText("Lomakkeen lähetyksessä tapahtui virhe")
      ).toBeDefined();
      expect(renderResult.getByText(error)).toBeDefined();
    });
  });
});
