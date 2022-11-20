import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";

import StatsAndFilter from "../StatsAndFilter";

const onChangeHandler = jest.fn();

test("render combobox correctly", () => {
  render(
    <StatsAndFilter
      todoCounter={0}
      todoCompletedRatio={"0"}
      todoUncompletedRatio={"0"}
      onChange={onChangeHandler}
      selectValue="All"
    />
  );
  const combobox = screen.getByRole("combobox");
  expect(combobox).toBeInTheDocument();
});

test("should correctly set default option", () => {
  render(
    <StatsAndFilter
      todoCounter={0}
      todoCompletedRatio={"0"}
      todoUncompletedRatio={"0"}
      onChange={onChangeHandler}
      selectValue="All"
    />
  );
  expect(
    screen.getByRole<HTMLOptionElement>("option", {
      name: "All",
    } as HTMLSelectElement).selected
  ).toBe(true);
});

test("should display correct number of options", () => {
  render(
    <StatsAndFilter
      todoCounter={0}
      todoCompletedRatio={"0"}
      todoUncompletedRatio={"0"}
      onChange={onChangeHandler}
      selectValue="All"
    />
  );

  expect(screen.getAllByRole("option").length).toBe(3);
});

test("all stats present on initial render", () => {
  render(
    <StatsAndFilter
      todoCounter={0}
      todoCompletedRatio={"0"}
      todoUncompletedRatio={"0"}
      onChange={onChangeHandler}
      selectValue="All"
    />
  );
  const totalLabel = screen.getByText("All");
  expect(totalLabel).toBeInTheDocument();

  const completedLabel = screen.getByText("Completed:");
  expect(completedLabel).toBeInTheDocument();

  const uncompletedLabel = screen.getByText("Uncompleted:");
  expect(uncompletedLabel).toBeInTheDocument();
});
