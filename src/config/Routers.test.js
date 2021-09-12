import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { shallow } from "enzyme";
import Routers from "./Routers";

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

describe("Routers", () => {
  it('should render Routers correctly in "debug" mode', () => {
    const component = shallow(<Routers debug />);
    expect(component).toMatchSnapshot();
  });
  it("should render Routers correctly with no props", () => {
    const component = shallow(<Routers />);
    expect(component).toMatchSnapshot();
  });
});
