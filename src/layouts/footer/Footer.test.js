import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { shallow } from "enzyme";
import Footer from "./Footer";

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

describe("Footer", () => {
  it('should render Footer correctly in "debug" mode', () => {
    const component = shallow(<Footer debug />);
    expect(component).toMatchSnapshot();
  });
  it("should render Footer correctly with no props", () => {
    const component = shallow(<Footer />);
    expect(component).toMatchSnapshot();
  });
});
