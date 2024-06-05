import React from "react";

import "./styles.scss";

interface InputComponentProps {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: (e: React.FormEvent) => void;
}

const InputComponent: React.FC<InputComponentProps> = ({
  todo,
  setTodo,
  handleAdd,
}) => {
  let inputRef = React.useRef<HTMLInputElement>(null);

  return (
    <form
      className="form"
      onSubmit={(e) => {
        inputRef.current?.blur();
        handleAdd(e);
      }}
    >
      <input
        ref={inputRef}
        className="form__input"
        name="task-list"
        type="text"
        placeholder="put any task"
        value={todo}
        onChange={(e) => {
          setTodo(e.target.value);
        }}
      />
      <button className="form__btn" type="submit">
        add
      </button>
    </form>
  );
};

export default InputComponent;
