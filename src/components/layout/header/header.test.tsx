import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import { Header } from ".";

test("renders logo in header", async () => {
  render(<Header />);

  const element = screen.getByRole("img");

  expect(element).toBeDefined();
});
