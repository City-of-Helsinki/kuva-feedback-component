import React from "react";
import { render, fireEvent } from "@testing-library/react";

import FeedbackComponent from "../FeedbackComponent";

describe("<FeedbackComponent />", () => {
  const getWrapper = () => render(<FeedbackComponent locale="fi" />);

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
});
