import { ToDoState } from "../redux/types";
import Button from "./Button";
import Input from "./Input";
import Checkbox from "./Checkbox";
import { useCallback, memo } from "react";

type ToDoListProps = {
  todoList: { [key: string]: ToDoState };
  onFocusOut: (e: React.FocusEvent<HTMLInputElement>, itemKey?: string) => void;
  onFocus: (itemKey?: string) => void;
  onButtonClick: (itemKey?: string) => void;
  onCheckBoxClick: (itemKey?: string) => void;
};

function ToDoList({
  todoList,
  onButtonClick,
  onCheckBoxClick,
  onFocus,
  onFocusOut,
}: ToDoListProps) {
  const handleButtonClick = useCallback(
    (itemKey?: string) => {
      onButtonClick(itemKey);
    },
    [onButtonClick]
  );

  const handleCheckBoxClick = useCallback(
    (itemKey?: string) => {
      onCheckBoxClick(itemKey);
    },
    [onCheckBoxClick]
  );

  const handleOnFocus = useCallback(
    (itemKey?: string) => {
      onFocus(itemKey);
    },
    [onFocus]
  );

  const handleOnFocusOut = useCallback(
    (e: React.FocusEvent<HTMLInputElement>, itemKey: string) => {
      onFocusOut(e, itemKey);
    },
    [onFocusOut]
  );

  return (
    <ul className="todo-list">
      {Object.keys(todoList).length === 0 ? (
        <li className="no-todos">No ToDos...</li>
      ) : (
        <>
          {Object.keys(todoList).map((key) => {
            const { isCompleted, toDoItemText, isInEditMode } = todoList[key];

            return (
              <li key={key} className="todo-item">
                <Checkbox
                  className="todo-checkbox"
                  onClick={() => handleCheckBoxClick(key)}
                  isDisabled={isInEditMode ? true : false}
                  isChecked={isCompleted}
                />
                <Input
                  inputType="text"
                  className={
                    isCompleted
                      ? "todo-input todo-completed"
                      : isInEditMode
                      ? "todo-input todo-active"
                      : "todo-input"
                  }
                  userInput={toDoItemText}
                  inputDisabled={isCompleted ? true : false}
                  onFocus={() => handleOnFocus(key)}
                  onBlur={(e) => handleOnFocusOut(e, key)}
                />
                <Button
                  className="todo-btn"
                  btnText="Delete"
                  onClick={() => handleButtonClick(key)}
                />
              </li>
            );
          })}
        </>
      )}
    </ul>
  );
}

export default memo(ToDoList);
