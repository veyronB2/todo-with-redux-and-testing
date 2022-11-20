import { ActionType } from "../actions/action-types";

interface DeleteToDo {
  type: ActionType.DELETE_TODO;
  payload: { itemKey?: string };
}

interface UpdateFilter {
  type: ActionType.UPDATE_FILTER;
  payload: { filter: string };
}

interface AddToDo {
  type: ActionType.ADD_TODO;
  payload: {
    todo: String;
    isCompleted: boolean;
    itemKey: string;
    isInEditMode: boolean;
  };
}

interface FilterToDo {
  type: ActionType.FILTER_TODOS;
  payload: { filter: string };
}

export type Action = DeleteToDo | UpdateFilter | AddToDo | FilterToDo;
