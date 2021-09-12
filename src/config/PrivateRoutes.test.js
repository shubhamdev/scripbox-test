import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { shallow } from "enzyme";
import PrivateRoutes from "./PrivateRoutes";

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

describe("PrivateRoutes", () => {
  it('should render PrivateRoutes correctly in "debug" mode', () => {
    const component = shallow(<PrivateRoutes debug />);
    expect(component).toMatchSnapshot();
  });
  it("should render PrivateRoutes correctly with no props", () => {
    const component = shallow(<PrivateRoutes />);
    expect(component).toMatchSnapshot();
  });
});
