import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import { Input } from ".";

describe("<Input />", () => {
  beforeEach(() => {
    render(
      <Input
        name="name"
        value="value"
        type="text"
        handleInputChange={(e) => e}
      />
    );
  });

  test("input renders", () => {
    const input = screen.getByRole("textbox");

    expect(input).toBeDefined();
  });

  test("renders correct value", () => {
    const input = screen.getByRole("textbox");

    expect(input).toHaveValue("value");
  });
});
