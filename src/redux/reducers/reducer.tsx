import { UIState, Action } from "../types";
import { ActionType } from "../actions/action-types";
import { INITIAL_STATE } from "../state/InitialState";
import { getFilteredTODOs } from "../../utils/utils";

const reducer = (state = INITIAL_STATE, action: Action): UIState => {
  const { payload } = action;
  const actionsMap: { [key: string]: Function } = {
    [ActionType.RESET_STATE]: resetState,
    [ActionType.ADD_TODO]: addNewToDo,
    [ActionType.DELETE_TODO]: deleteToDo,
    [ActionType.COMPLETE_TODO]: toggleCompleted,
    [ActionType.UPDATE_TODO_TEXT]: updateToDoText,
    [ActionType.UPDATE_EDIT_STATUS]: updateIsEditableStatus,
    [ActionType.UPDATE_FILTER]: updateCurrentFilter,
    [ActionType.FILTER_TODOS]: getFilteredToDos,
  };
  return actionsMap[action.type] ? actionsMap[action.type]() : state;

  function getFilteredToDos() {
    return {
      ...state,
      currentFilter: payload?.filter,
      filteredToDoList: getFilteredTODOs({
        todoList: state.todoList,
        filter: payload?.filter!,
      }),
    };
  }

  function updateCurrentFilter() {
    return {
      ...state,
      currentFilter: payload?.filter,
    };
  }

  function updateIsEditableStatus() {
    return {
      ...state,
      todoList: {
        ...state.todoList,
        [`${payload?.itemKey}`]: {
          ...state.todoList[`${payload?.itemKey}`],
          isInEditMode: payload?.isInEditMode,
          toDoItemText: payload?.todo,
        },
      },
      filteredToDoList: {
        ...state.filteredToDoList,
        [`${payload?.itemKey}`]: {
          ...state.todoList[`${payload?.itemKey}`],
          isInEditMode: payload?.isInEditMode,
          toDoItemText: payload?.todo,
        },
      },
    };
  }

  function updateToDoText() {
    return {
      ...state,
      todoList: {
        ...state.todoList,
        [`${payload?.itemKey}`]: {
          toDoItemText: payload?.todo,
        },
      },
    };
  }

  function addNewToDo() {
    let todoCounter = state.todoCounter;
    let todoUncompletedCounter = state.todoUncompletedCounter;
    todoCounter++;
    todoUncompletedCounter++;
    return {
      ...state,
      todoCounter: todoCounter,
      todoUncompletedCounter: todoUncompletedCounter,
      todoList: {
        ...state.todoList,
        [`${payload?.itemKey}`]: {
          toDoItemText: payload?.todo,
          isCompleted: payload?.isCompleted,
          isInEditMode: payload?.isInEditMode,
        },
      },
    };
  }

  function deleteToDo() {
    const list = { ...state.todoList };
    const isCompleted = list[payload?.itemKey!].isCompleted;
    let counter: number = state.todoCounter;
    let completedCounter: number = state.todoCompletedCounter;
    let uncompletedCounter: number = state.todoUncompletedCounter;

    counter--;

    isCompleted ? completedCounter-- : uncompletedCounter--;

    delete list[payload?.itemKey!];
    return {
      ...state,
      todoCounter: counter,
      todoCompletedCounter: completedCounter,
      todoUncompletedCounter: uncompletedCounter,
      todoList: list,
    };
  }

  function toggleCompleted() {
    let todoCompletedCounter = state.todoCompletedCounter;
    let todoUncompletedCounter = state.todoUncompletedCounter;

    if (payload?.isCompleted) {
      todoCompletedCounter++;
      todoUncompletedCounter--;
    } else {
      todoCompletedCounter--;
      todoUncompletedCounter++;
    }

    return {
      ...state,
      todoCompletedCounter: todoCompletedCounter,
      todoUncompletedCounter: todoUncompletedCounter,
      todoList: {
        ...state.todoList,
        [`${payload?.itemKey}`]: {
          ...state.todoList[`${payload?.itemKey}`],
          isCompleted: payload?.isCompleted,
        },
      },
    };
  }

  function resetState() {
    return {
      ...INITIAL_STATE,
    };
  }
};

export default reducer;
