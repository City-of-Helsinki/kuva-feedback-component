import { FeedbackComponent, defaultMessages, hdsTheme } from "../index";

describe("package exports", () => {
  it("should export FeedbackComponent", () => {
    expect(FeedbackComponent).toBeDefined();
  });

  it("should export defaultMessages", () => {
    expect(defaultMessages).toBeDefined();
  });

  it("should export hdsTheme", () => {
    expect(hdsTheme).toBeDefined();
  });
});
