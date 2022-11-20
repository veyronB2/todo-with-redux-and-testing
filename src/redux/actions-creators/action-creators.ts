import { ActionType } from "../actions/action-types";

export const filterChange = (selectedFilter: string) => ({
  type: ActionType.UPDATE_FILTER,
  payload: { filter: selectedFilter },
});

export const filteredToDos = (selectedFilter: string) => ({
  type: ActionType.FILTER_TODOS,
  payload: { filter: selectedFilter },
});

export const submitForm = (userInput: string, itemKey: string) => ({
  type: ActionType.ADD_TODO,
  payload: {
    todo: userInput,
    isCompleted: false,
    itemKey: itemKey,
    isInEditMode: false,
  },
});

export const deleteToDo = (itemKey: string) => ({
  type: ActionType.DELETE_TODO,
  payload: { itemKey: itemKey },
});

export const checkBoxClick = (itemKey: string, completedInd: boolean) => ({
  type: ActionType.COMPLETE_TODO,
  payload: {
    itemKey: itemKey,
    isCompleted: completedInd,
  },
});

export const onFocus = (itemKey: string, editInd: boolean) => ({
  type: ActionType.UPDATE_EDIT_STATUS,
  payload: {
    itemKey: itemKey,
    isInEditMode: editInd,
  },
});

export const onFocusOut = (
  itemKey: string,
  editInd: boolean,
  event: React.FocusEvent<HTMLInputElement>
) => ({
  type: ActionType.UPDATE_EDIT_STATUS,
  payload: {
    todo: (event.target as HTMLInputElement).value,
    itemKey: itemKey,
    isInEditMode: editInd,
  },
});

export const resetState = () => ({
  type: ActionType.RESET_STATE,
});
