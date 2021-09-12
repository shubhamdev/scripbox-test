import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { shallow } from "enzyme";
import PublicRoutes from "./PublicRoutes";

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

describe("PublicRoutes", () => {
  it('should render PublicRoutes correctly in "debug" mode', () => {
    const component = shallow(<PublicRoutes debug />);
    expect(component).toMatchSnapshot();
  });
  it("should render PublicRoutes correctly with no props", () => {
    const component = shallow(<PublicRoutes />);
    expect(component).toMatchSnapshot();
  });
});
