import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { shallow } from "enzyme";
import DashboardPage from "./DashboardPage";

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

describe("DashboardPage component", () => {
  it('should render DashboardPage component correctly in "debug" mode', () => {
    const component = shallow(<DashboardPage debug />);
    expect(component).toMatchSnapshot();
  });
  it("should render DashboardPage component correctly with no props", () => {
    const component = shallow(<DashboardPage />);
    expect(component).toMatchSnapshot();
  });
});
