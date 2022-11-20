import React from "react";

type ButtonProps = {
  className: string;
  btnText: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

function Button({ className, btnText, onClick }: ButtonProps) {
  function clickHandler(e: React.MouseEvent<HTMLButtonElement>) {
    onClick?.(e);
  }

  return (
    <button className={className} onClick={clickHandler}>
      {btnText}
    </button>
  );
}

export default React.memo(Button);
