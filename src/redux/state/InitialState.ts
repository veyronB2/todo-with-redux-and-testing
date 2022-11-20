import { UIState } from "../types";
export const INITIAL_STATE: UIState = {
  todoList: {},
  filteredToDoList: {},
  todoCounter: 0,
  todoCompletedCounter: 0,
  todoUncompletedCounter: 0,
  currentFilter: "all",
};
