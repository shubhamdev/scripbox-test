import { capitalizeFirstLetter } from "./service";

describe("App", () => {
  it("Should be false", () => {
    expect(capitalizeFirstLetter("SHUBHAM")).toBe("Shubham");
    // expect(test).toBe("Shubham");
  });
});
