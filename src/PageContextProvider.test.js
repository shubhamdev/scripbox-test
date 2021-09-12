import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { render, screen } from "@testing-library/react";
import { shallow } from "enzyme";
import PageContextProvider from "./PageContextProvider";

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

describe("PageContextProvider", () => {
  it('should render PageContextProvider correctly in "debug" mode', () => {
    const component = shallow(<PageContextProvider debug />);
    expect(component).toMatchSnapshot();
  });
  it("should render PageContextProvider correctly with no props", () => {
    const component = shallow(<PageContextProvider />);
    expect(component).toMatchSnapshot();
  });
});
