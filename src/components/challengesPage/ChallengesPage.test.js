import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { shallow } from "enzyme";
import ChallengesPage from "./ChallengesPage";

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

describe("ChallengesPage component", () => {
  it('should render ChallengesPage component correctly in "debug" mode', () => {
    const component = shallow(<ChallengesPage debug />);
    expect(component).toMatchSnapshot();
  });
  it("should render ChallengesPage component correctly with no props", () => {
    const component = shallow(<ChallengesPage />);
    expect(component).toMatchSnapshot();
  });
});
