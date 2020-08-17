import React from "react";
import {
  render,
  fireEvent,
  RenderResult,
  waitFor,
} from "@testing-library/react";

import Open311Backend from "../../open311Backend/Open311Backend";
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

describe("<FeedbackComponent /> with defaults", () => {
  const defaultProps = {
    locale: "fi",
    onSubmit: () => Promise.resolve(),
  };
  const getWrapper = (props?: Partial<Props>) =>
    render(<FeedbackComponent {...defaultProps} {...props} />);
  let consoleCache: Console;

  beforeAll(() => {
    consoleCache = global.console;
    global.console.error = jest.fn();
    global.console.warn = jest.fn();
  });

  afterAll(() => {
    global.console = consoleCache;
  });

  describe("user interaction", () => {
    it("user can input expected information", () => {
      const mediaFieldLabel = "Lisää tiedosto";
      const mediaFieldFiles = [
        new File([""], "file_1.png", { type: "image/png" }),
        new File([""], "file_2.png", { type: "image/png" }),
      ];
      // I've omitted testing service request type, because it'll require
      // custom traversal logic.
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
          label: mediaFieldLabel,
          value: mediaFieldFiles,
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
      const { getByLabelText, getByDisplayValue, getByText } = getWrapper();

      // Reveal all fields
      fireEvent.click(getByLabelText("Haluan vastauksen palautteeseeni"));

      fields.forEach(({ label, value }) => {
        const input = getByLabelText(label);

        if (label === mediaFieldLabel && Array.isArray(value)) {
          fireEvent.change(input, {
            target: {
              files: value,
            },
          });

          value.forEach((file) => {
            expect(getByText(file.name)).toBeDefined();
          });
        } else if (typeof value === "string") {
          fireEvent.change(input, {
            target: {
              value,
            },
          });

          expect(getByDisplayValue(value)).toBeDefined();
        }
      });
    });

    it("user sees success view when submit succeeds", async () => {
      const onSubmit = jest.fn(() => Promise.resolve());
      const renderResult = getWrapper({
        onSubmit,
      });

      submitForm(renderResult);

      await waitFor(() =>
        expect(renderResult.getByText("Kiitos palautteestasi!")).toBeDefined()
      );
      expect(onSubmit).toHaveBeenCalledTimes(1);
    });

    it("user sees error message when submit fails", async () => {
      const error = "Network error";
      const renderResult = getWrapper({
        onSubmit: () => Promise.reject(error),
      });

      submitForm(renderResult);

      await waitFor(() => {
        expect(
          renderResult.getByText("Lomakkeen lähetys epäonnistui virheen takia")
        ).toBeDefined();
        expect(renderResult.getByText(error)).toBeDefined();
      });
    });
  });

  describe("developer interaction", () => {
    it("throws an error when both backendConfig and onSubmit are missing", () => {
      expect(() => {
        getWrapper({
          onSubmit: undefined,
        });
      }).toThrowErrorMatchingInlineSnapshot(
        `"You must provide either a configuration object for the default backend, or implement a backend yourself by providing the onSubmit prop."`
      );
    });

    it("logs warning when a required field is excluded without a valid value", async () => {
      getWrapper({
        exclude: ["description"],
      });

      await waitFor(() => {
        expect(global.console.warn).toHaveBeenCalled();
      });

      // Checks that the first parameter of the first call to console.warn
      // matches with snapshot.
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      expect(global.console.warn.mock.calls[0][0]).toMatchInlineSnapshot(
        `"You have toggled off the description field and not provided a valid default value for it. This means the user won't ever be able to submit the form successfully."`
      );
    });
  });

  describe("internal", () => {
    it("should clean form values before sending them to the Open311 backend", async () => {
      const spy = jest
        .spyOn(Open311Backend.prototype, "postServiceRequest")
        .mockImplementation(() =>
          Promise.resolve({
            service_request_id: "1",
            service_notice: "",
          })
        );

      const renderResult = getWrapper({
        backendConfig: {
          apiKey: "1234",
          serviceCode: "1",
          url: "hhhh",
        },
        onSubmit: undefined,
      });

      submitForm(renderResult);

      await waitFor(() => {
        expect(spy.mock.calls[0][0]).toMatchInlineSnapshot(`
          Object {
            "description": "Test feedback content",
            "locale": "fi",
            "service_request_type": "OTHER",
          }
        `);
      });

      jest.restoreAllMocks();
    });
  });
});
