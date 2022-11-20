import Button from "../components/Button";
import Input from "./Input";
import { memo } from "react";

type FormProps = {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputValue: string;
};

function ToDoForm({ onSubmit, onInputChange, inputValue }: FormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    onSubmit(e);
  };
  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <Input
        inputType="text"
        className="add-todo-input"
        placeHolder="Add to do..."
        onChange={onInputChange}
        userInput={inputValue}
      />
      <Button className="submit-btn" btnText="submit" />
    </form>
  );
}

export default memo(ToDoForm);
