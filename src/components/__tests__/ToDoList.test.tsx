import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import ToDoList from "../ToDoList";

//import userEvent from "@testing-library/user-event";

test("show no todos in initial render", () => {
  render(
    <ToDoList
      todoList={{}}
      onButtonClick={jest.fn()}
      onCheckBoxClick={jest.fn()}
      onFocus={jest.fn()}
      onFocusOut={jest.fn()}
    />
  );
  const listItem = screen.getByText(/no todos.../i);
  expect(listItem).toBeInTheDocument();
});

test("should render text passed as a prop and display a checkbox and delete button", () => {
  const toDoList = {
    1: { isCompleted: false, toDoItemText: "shopping", isInEditMode: false },
  };
  render(
    <ToDoList
      todoList={toDoList}
      onButtonClick={jest.fn()}
      onCheckBoxClick={jest.fn()}
      onFocus={jest.fn()}
      onFocusOut={jest.fn()}
    />
  );
  const checkbox = screen.getByRole("checkbox");
  const deleteBtn = screen.getByText(/delete/i);
  const displayedValue = screen.getByDisplayValue(/shopping/i);
  expect(checkbox).toBeInTheDocument();
  expect(deleteBtn).toBeInTheDocument();
  expect(displayedValue).toBeInTheDocument();
});

test("check if all todos are displayed", () => {
  const toDoListAll = {
    1: { isCompleted: false, toDoItemText: "shopping", isInEditMode: false },
    2: {
      isCompleted: false,
      toDoItemText: "doctor visit",
      isInEditMode: false,
    },
    3: {
      isCompleted: false,
      toDoItemText: "walk the dog",
      isInEditMode: false,
    },
  };
  render(
    <ToDoList
      todoList={toDoListAll}
      onButtonClick={jest.fn()}
      onCheckBoxClick={jest.fn()}
      onFocus={jest.fn()}
      onFocusOut={jest.fn()}
    />
  );
  const allItems = screen.getAllByRole("listitem");
  const allCheckBoxes = screen.getAllByRole("checkbox");
  const allDeleteBtns = screen.getAllByRole("button", { name: /delete/i });
  expect(allItems).toHaveLength(3);
  expect(allCheckBoxes).toHaveLength(3);
  expect(allDeleteBtns).toHaveLength(3);
});

test("triggers on click callback", () => {
  const spy = jest.fn();
  const toDoList = {
    1: { isCompleted: false, toDoItemText: "shopping", isInEditMode: false },
  };

  render(
    <ToDoList
      todoList={toDoList}
      onButtonClick={spy}
      onCheckBoxClick={jest.fn()}
      onFocus={jest.fn()}
      onFocusOut={jest.fn()}
    />
  );

  userEvent.click(screen.getByRole("button"));

  expect(spy).toHaveBeenCalledTimes(1);
});
