import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { shallow } from "enzyme";
import App from "./App";
import Routers from "./config/Routers";

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

describe("Render App component", () => {
  it('should render App component correctly in "debug" mode', () => {
    const component = shallow(<App debug />);
    expect(component).toMatchSnapshot();
  });
  it("should render App component correctly with no props", () => {
    const component = shallow(<App />);
    expect(component).toMatchSnapshot();
  });

  it('should render Routers component correctly in "debug" mode', () => {
    const component = shallow(<Routers debug />);
    expect(component).toMatchSnapshot();
  });

  it("should render Routers component correctly with no props", () => {
    const component = shallow(<Routers />);
    expect(component).toMatchSnapshot();
  });
});
