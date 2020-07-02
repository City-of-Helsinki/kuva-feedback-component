import React from "react";
import { render } from "@testing-library/react";

import TestComponent from "./TestComponent";

describe("<TestComponent />", () => {
  const getWrapper = () => render(<TestComponent />);

  it("renders correct content", () => {
    const { getByText } = getWrapper();

    expect(getByText("Test")).toBeDefined();
  });
});
