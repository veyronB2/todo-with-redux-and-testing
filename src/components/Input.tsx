import React from "react";
export type InputProps = {
  inputType: string;
  className: string;
  userInput?: string;
  placeHolder?: string;
  inputDisabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
};

function Input({
  inputType,
  className,
  placeHolder,
  onChange,
  userInput,
  inputDisabled,
  onFocus,
  onBlur,
  onClick,
}: InputProps) {
  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    onChange?.(e);
  }
  return (
    <>
      <input
        type={inputType}
        className={className}
        placeholder={placeHolder}
        value={userInput}
        onChange={handleOnChange}
        disabled={inputDisabled}
        onFocus={onFocus}
        onBlur={(e) => onBlur?.(e)}
        onClick={onClick}
      />
    </>
  );
}

export default Input;
