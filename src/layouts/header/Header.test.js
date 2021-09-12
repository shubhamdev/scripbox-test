import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { shallow } from "enzyme";
import Header from "./Header";

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

describe("Header", () => {
  it('should render Header correctly in "debug" mode', () => {
    const component = shallow(<Header debug />);
    expect(component).toMatchSnapshot();
  });
  it("should render Header correctly with no props", () => {
    const component = shallow(<Header />);
    expect(component).toMatchSnapshot();
  });
});
