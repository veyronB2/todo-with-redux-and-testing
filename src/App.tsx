import { useEffect, useMemo, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { AppState } from "./redux/reducers/combineReducers";
import { bindActionCreators } from "redux";
import { actionCreators } from "./redux";
import StatsAndFilter from "./components/StatsAndFilter";
import { getCompletedToDosPercent, getUniqueKey } from "./utils/utils";
import ToDoForm from "./components/ToDoForm";
import {
  checkBoxClick,
  deleteToDo,
  filterChange,
  filteredToDos,
  onFocus,
  onFocusOut,
  resetState,
  submitForm,
} from "./redux/actions-creators/action-creators";
import ToDoList from "./components/ToDoList";
import Button from "./components/Button";

function App() {
  const state = useSelector((state: AppState) => state.main);
  const [userInput, setUserInput] = useState<string>("");
  const dispatch = useDispatch();
  const { todoCounter, filteredToDoList, currentFilter } = state;

  bindActionCreators(actionCreators, dispatch);

  function handleUserInput(e: React.ChangeEvent<HTMLInputElement>) {
    setUserInput(e.target.value);
  }

  const handleFilterChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedFilter = (
        e.target as HTMLSelectElement
      ).value.toLowerCase();
      dispatch(filterChange(selectedFilter));
    },
    [dispatch]
  );

  const handleFormSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const itemKey = getUniqueKey();

      if (userInput) {
        dispatch(submitForm(userInput, itemKey));
        setUserInput("");
      }
      dispatch(filteredToDos(currentFilter));
    },
    [currentFilter, dispatch, userInput]
  );

  const handleDeleteButtonClick = useCallback(
    (itemKey?: string) => {
      itemKey && dispatch(deleteToDo(itemKey));
    },
    [dispatch]
  );

  const handleCheckBoxClick = useCallback(
    (itemKey?: string) => {
      const completedInd = !state.todoList[itemKey!].isCompleted;
      itemKey && dispatch(checkBoxClick(itemKey, completedInd));
    },
    [dispatch, state.todoList]
  );

  const handleOnFocusToDo = useCallback(
    (itemKey?: string) => {
      const editInd = !state.todoList[itemKey!].isInEditMode;
      itemKey && dispatch(onFocus(itemKey, editInd));
    },
    [dispatch, state.todoList]
  );

  const handleOnFocusOut = useCallback(
    (e: React.FocusEvent<HTMLInputElement>, itemKey?: string): void => {
      const editInd = !state.todoList[itemKey!].isInEditMode;
      itemKey && dispatch(onFocusOut(itemKey, editInd, e));
    },
    [dispatch, state.todoList]
  );

  const handleClearButtonClick = useCallback(() => {
    dispatch(resetState());
  }, [dispatch]);

  const counterToDo = state.todoCounter;
  const todoCompletedCounter = state.todoCompletedCounter;
  const todoUncompletedCounter = state.todoUncompletedCounter;
  const { uncompletedRatio, completedRatio } = useMemo(
    () =>
      getCompletedToDosPercent({
        counterToDo,
        todoUncompletedCounter,
        todoCompletedCounter,
      }),
    [counterToDo, todoCompletedCounter, todoUncompletedCounter]
  );

  useEffect(() => {
    dispatch(filteredToDos(currentFilter));
  }, [
    currentFilter,
    todoCompletedCounter,
    todoUncompletedCounter,
    todoCounter,
    dispatch,
  ]);
  return (
    <main>
      <section className="container">
        <h1>to do list</h1>
        <StatsAndFilter
          todoCounter={todoCounter}
          todoCompletedRatio={completedRatio}
          todoUncompletedRatio={uncompletedRatio}
          onChange={handleFilterChange}
          selectValue={currentFilter}
        />
        <ToDoForm
          onSubmit={handleFormSubmit}
          onInputChange={handleUserInput}
          inputValue={userInput}
        />
        <ToDoList
          todoList={filteredToDoList}
          onButtonClick={handleDeleteButtonClick}
          onCheckBoxClick={handleCheckBoxClick}
          onFocus={handleOnFocusToDo}
          onFocusOut={handleOnFocusOut}
        />
        <Button
          className="clear-btn"
          btnText="clear list"
          onClick={handleClearButtonClick}
        />
      </section>
    </main>
  );
}

export default App;
