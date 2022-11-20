import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import ToDoForm from "../ToDoForm";

const handleSubmit = jest.fn();
const onInputChange = jest.fn();

test("input present on initial render", () => {
  render(
    <ToDoForm
      onSubmit={handleSubmit}
      onInputChange={onInputChange}
      inputValue="Shopping"
    />
  );
  const input = screen.getByPlaceholderText(/add to do.../i);
  expect(input).toBeInTheDocument();
});

test("submit button present on initial render", () => {
  render(
    <ToDoForm
      onSubmit={handleSubmit}
      onInputChange={onInputChange}
      inputValue="Shopping"
    />
  );
  const button = screen.getByText(/submit/i);
  expect(button).toBeInTheDocument();
});
