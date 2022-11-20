/* eslint-disable */
import {
  getAllByRole,
  getByDisplayValue,
  getByRole,
  render,
  screen,
} from "@testing-library/react";
import { Provider } from "react-redux";
import App from "../../App";
import { getStore } from "../../redux/store/store";
import userEvent from "@testing-library/user-event";

const input = () => {
  return screen.getByPlaceholderText("Add to do...");
};

const submitButton = () => {
  return screen.getByText("submit");
};

const listItems = () => {
  return screen.getAllByRole("listitem");
};

const renderComponent = (component: JSX.Element) => {
  return render(<Provider store={getStore()}>{component}</Provider>);
};

const statsLabels = () => {
  const completedPercent = screen.getByRole("completed-stat");
  const uncompletedPercent = screen.getByRole("uncompleted-stat");
  const totalItems = screen.getByRole("total-stat");
  return {
    completedPercent,
    uncompletedPercent,
    totalItems,
  };
};

const addToDos = () => {
  userEvent.type(input(), "to-do item 1");
  userEvent.click(submitButton());
  userEvent.type(input(), "to-do item 2");
  userEvent.click(submitButton());
};

describe("combobox and stats initial render", () => {
  test("combobox default selection and number of options", () => {
    renderComponent(<App />);

    expect(
      screen.getByRole<HTMLOptionElement>("option", {
        name: "All",
      } as HTMLSelectElement).selected
    ).toBe(true);

    expect(screen.getAllByRole("option").length).toBe(3);
  });

  test("stats labels correct on initial render", () => {
    renderComponent(<App />);
    const { completedPercent, uncompletedPercent, totalItems } = statsLabels();

    expect(completedPercent).toHaveTextContent("0%");
    expect(uncompletedPercent).toHaveTextContent("0%");
    expect(totalItems).toHaveTextContent("0");
  });
});

describe("to-do list", () => {
  test("empty list on initial render", () => {
    renderComponent(<App />);
    const item = screen.getByRole("listitem");
    expect(item).toHaveTextContent("No ToDos...");
  });

  test("adds to-dos", () => {
    renderComponent(<App />);

    userEvent.type(input(), "to-do item 1");
    userEvent.click(submitButton()); //should clear input after each submit
    expect(input()).toHaveDisplayValue("");
    userEvent.type(input(), "to-do item 2");
    userEvent.click(submitButton());
    expect(input()).toHaveDisplayValue("");

    const items = listItems();
    expect(items.length).toEqual(2);
    expect(
      (items[0].querySelector('input[type="text"]') as HTMLInputElement).value
    ).toContain("to-do item 1");
    expect(
      items[0].querySelector('input[type="text"]') as HTMLInputElement
    ).not.toHaveClass("todo-completed");

    expect(
      (items[1].querySelector('input[type="text"]') as HTMLInputElement).value
    ).toContain("to-do item 2");
    expect(
      items[1].querySelector('input[type="text"]') as HTMLInputElement
    ).not.toHaveClass("todo-completed");
  });

  test("delete to-dos", () => {
    renderComponent(<App />);
    addToDos();

    const items = listItems();
    expect(items.length).toEqual(2);

    const deleteButtons = screen.getAllByText(/delete/i);

    userEvent.click(deleteButtons[0]);
    expect(screen.getAllByRole("listitem").length).toBe(items.length - 1);

    userEvent.click(deleteButtons[1]);
    expect(screen.getAllByRole("listitem").length).toBe(1);

    const item = screen.getByRole("listitem");
    expect(item).toHaveTextContent("No ToDos...");
  });

  test("clear the list", () => {
    renderComponent(<App />);
    addToDos();
    const clearBtn = screen.getByRole("button", { name: /clear list/i });
    expect(clearBtn).toBeInTheDocument();

    userEvent.click(clearBtn);
    const item = screen.getByRole("listitem");
    expect(item).toHaveTextContent("No ToDos...");
  });

  test("checkbox click marks to-do as completed on the first click and undoes on the second click", () => {
    renderComponent(<App />);

    userEvent.type(input(), "to-do item 1");
    userEvent.click(submitButton());

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).not.toBeChecked();

    userEvent.click(checkbox);
    expect(checkbox).toBeChecked();

    const todo = screen.getByDisplayValue("to-do item 1");
    expect(todo).toHaveClass("todo-completed");
    expect(todo).toBeDisabled();

    userEvent.click(checkbox);
    const todo1 = screen.getByDisplayValue("to-do item 1");
    expect(checkbox).not.toBeChecked();
    expect(todo1).not.toHaveClass("todo-completed");
    expect(todo1).not.toBeDisabled();
  });

  test("stats should be correct when items added", () => {
    renderComponent(<App />);
    addToDos();
    const { completedPercent, uncompletedPercent, totalItems } = statsLabels();

    expect(totalItems).toHaveTextContent("2");
    expect(completedPercent).toHaveTextContent("0%");
    expect(uncompletedPercent).toHaveTextContent("100%");
  });

  test("stats should update on checkbox clicks", () => {
    renderComponent(<App />);
    addToDos();
    const { completedPercent, uncompletedPercent, totalItems } = statsLabels();

    const checkboxes = screen.getAllByRole("checkbox");

    userEvent.click(checkboxes[0]);

    expect(totalItems).toHaveTextContent("2");
    expect(completedPercent).toHaveTextContent("50%");
    expect(uncompletedPercent).toHaveTextContent("50%");

    userEvent.click(checkboxes[1]);
    expect(completedPercent).toHaveTextContent("100%");
    expect(uncompletedPercent).toHaveTextContent("0%");

    userEvent.click(checkboxes[0]);
    expect(completedPercent).toHaveTextContent("50%");
    expect(uncompletedPercent).toHaveTextContent("50%");

    userEvent.click(checkboxes[1]);
    expect(completedPercent).toHaveTextContent("0%");
    expect(uncompletedPercent).toHaveTextContent("100%");
  });

  test("filter completed to-dos", () => {
    renderComponent(<App />);
    addToDos();

    const checkboxes = screen.getAllByRole("checkbox");

    userEvent.click(checkboxes[0]);

    userEvent.selectOptions(
      screen.getByRole("combobox"),
      screen.getByRole("option", { name: "completed" })
    );
    expect(
      screen.getByRole<HTMLOptionElement>("option", { name: "completed" })
        .selected
    ).toBe(true);

    const items = screen.getAllByRole("listitem");
    expect(items).toHaveLength(1);

    const checkbox = screen.getByRole("checkbox");
    const todo = screen.getByDisplayValue("to-do item 1");
    expect(todo).toHaveClass("todo-completed");
    expect(checkbox).toBeChecked();
    expect(todo).toBeDisabled();
  });

  test("filter uncompleted to-dos and back to all items ", () => {
    renderComponent(<App />);
    addToDos();

    const checkboxes = screen.getAllByRole("checkbox");

    userEvent.click(checkboxes[0]);

    userEvent.selectOptions(
      screen.getByRole("combobox"),
      screen.getByRole("option", { name: "uncompleted" })
    );
    expect(
      screen.getByRole<HTMLOptionElement>("option", { name: "uncompleted" })
        .selected
    ).toBe(true);

    const items = screen.getAllByRole("listitem");
    expect(items).toHaveLength(1);

    const checkbox = screen.getByRole("checkbox");
    const todo = screen.getByDisplayValue("to-do item 2");
    expect(todo).not.toHaveClass("todo-completed");
    expect(checkbox).not.toBeChecked();
    expect(todo).not.toBeDisabled();

    userEvent.selectOptions(
      screen.getByRole("combobox"),
      screen.getByRole("option", { name: "All" })
    );

    expect(
      screen.getByRole<HTMLOptionElement>("option", { name: "All" }).selected
    ).toBe(true);
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
  });

  // test.only("should edit the to-do", () => {
  //   renderComponent(<App />);

  //   userEvent.type(input(), "to-do item 1");
  //   userEvent.click(submitButton());

  //   let item = screen.getByDisplayValue("to-do item 1");
  //   userEvent.click(item);
  //   item = screen.getByDisplayValue("to-do item 1");
  //   expect(item).toHaveClass("todo-active");
  // });
});
