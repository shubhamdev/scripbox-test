import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";
import { shallow } from "enzyme";
import LoginPage from "./LoginPage";

let realUseContext;
let useContextMock;

// Setup mock
beforeEach(() => {
  realUseContext = React.useContext;
  useContextMock = React.useContext = jest.fn();
  jest.resetAllMocks();
  // cleanup();
});

// Cleanup mock
afterEach(() => {
  React.useContext = realUseContext;
});

describe("LoginPage component", () => {
  it("renders without crashing", () => {
    useContextMock.mockReturnValue("User");
    const element = new ShallowRenderer().render(<LoginPage />);
    expect(element.props.children).toMatchSnapshot();
  });
});
