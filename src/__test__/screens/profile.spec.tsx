import React from "react";
import { render } from "@testing-library/react-native";

import Profile from "../../screens/Profile";

describe("Profile", () => {
  it("should have placeholder correctly in user name input", () => {
    const { getByPlaceholderText } = render(<Profile />);
    const inputName = getByPlaceholderText("name");
    expect(inputName).toBeTruthy();
  });

  it("shold be load user data", () => {
    const { getByTestId } = render(<Profile />);

    const inputName = getByTestId("input-name");
    const inputSurname = getByTestId("input-surname");

    expect(inputName.props.value).toEqual("Jere");
    expect(inputSurname.props.value).toEqual("lima");
  });

  it("should exist title correctly", () => {
    const { getByTestId } = render(<Profile />);
    const textTitle = getByTestId("text-title");
    expect(textTitle.props.children).toContain("Perfil");
  });
});
