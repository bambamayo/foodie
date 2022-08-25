import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import { Logo } from ".";

test("renders logo", async () => {
  render(<Logo />);

  const element = screen.getByAltText("foodie logo");

  expect(element).toBeDefined();
});
