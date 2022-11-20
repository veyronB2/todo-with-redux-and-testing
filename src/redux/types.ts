import { ActionType } from "./actions/action-types";

export type ToDoState = {
  isCompleted: boolean;
  toDoItemText: string;
  isInEditMode?: boolean;
};

export type UIState = {
  todoList: { [key: string]: ToDoState };
  filteredToDoList: { [key: string]: ToDoState };
  todoCounter: number;
  todoCompletedCounter: number;
  todoUncompletedCounter: number;
  currentFilter: string;
};

export type Payload = {
  todo?: string;
  isCompleted?: boolean;
  itemKey?: string;
  isInEditMode?: boolean;
  filter?: boolean | string;
};

export type Action = {
  type: ActionType;
  payload?: Payload;
};
