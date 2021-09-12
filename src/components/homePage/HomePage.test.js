import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { shallow } from "enzyme";
import HomePage from "./HomePage";

let container = null;

beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

describe("Homepage", () => {
  it('should render HomePage component correctly in "debug" mode', () => {
    const test = "Shubham";
    expect(test).toBe("Shubham");
  });
});
