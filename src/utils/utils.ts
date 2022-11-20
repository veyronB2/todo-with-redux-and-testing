import { ToDoState } from "../redux/types";
import { v4 } from "uuid";
type statsProps = {
  counterToDo: number;
  todoUncompletedCounter: number;
  todoCompletedCounter: number;
};

export function getCompletedToDosPercent({
  counterToDo,
  todoUncompletedCounter,
  todoCompletedCounter,
}: statsProps) {
  let uncompletedRatio: string;
  let completedRatio: string;

  if (counterToDo === 0) {
    uncompletedRatio = "0%";
    completedRatio = "0%";
  } else {
    uncompletedRatio = `${Math.round(
      (todoUncompletedCounter / counterToDo) * 100
    ).toString()}%`;

    completedRatio = `${Math.round(
      (todoCompletedCounter / counterToDo) * 100
    ).toString()}%`;
  }

  return {
    uncompletedRatio,
    completedRatio,
  };
}

type FilterProps = {
  todoList: { [key: string]: ToDoState };
  filter: boolean | string;
};
export function getFilteredTODOs({ todoList, filter }: FilterProps) {
  const list = Object.entries(todoList);
  let tempFilter: boolean = false;

  if (filter === "completed") {
    tempFilter = true;
  }

  if (filter !== "all") {
    const filteredList = Object.fromEntries(
      list.filter(function ([key, value]) {
        return value.isCompleted === tempFilter;
      })
    );
    return filteredList;
  } else return todoList;
}

export function getUniqueKey() {
  return v4();
}
