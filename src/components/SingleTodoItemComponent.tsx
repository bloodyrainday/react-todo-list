import React from "react";

import "./styles.scss";

import { FaEdit } from "react-icons/fa";
import { IoIosRemoveCircle } from "react-icons/io";
import { FaCheck } from "react-icons/fa";

import { Todo } from "../module";
import { Draggable } from "react-beautiful-dnd";

interface SingleTodoItemComponentProps {
  item: Todo;
  todoList: Todo[];
  setTodoList: React.Dispatch<React.SetStateAction<Todo[]>>;
  index: number;
}

const SingleTodoItemComponent: React.FC<SingleTodoItemComponentProps> = ({
  item,
  todoList,
  setTodoList,
  index,
}) => {
  const [edit, setEdit] = React.useState<boolean>(false);
  const [editTodo, setEditTodo] = React.useState<string>(item.todo);

  const handleEdit = () => {
    setEdit(!edit);
  };

  const handleCheck = (id: number) => {
    setTodoList(
      todoList.map((item) => {
        return item.id === id ? { ...item, isDone: !item.isDone } : item;
      })
    );
  };

  const handleRemove = (id: number) => {
    setTodoList(
      todoList.filter((item) => {
        return item.id !== id;
      })
    );
  };

  let inputEdit = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    inputEdit.current?.focus();
  }, [edit]);

  const handleChangeEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    setTodoList(
      todoList.map((item) => {
        return item.id === id ? { ...item, todo: editTodo } : item;
      })
    );
    setEdit(false);
  };

  return (
    <Draggable draggableId={item.id.toString()} index={index}>
      {(provided) => (
        <form
          className="todolist__item"
          onSubmit={(e) => handleChangeEdit(e, item.id)}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {edit && !item.isDone ? (
            <input
              ref={inputEdit}
              className="todolist__text"
              name="text"
              value={editTodo}
              onChange={(e) => {
                setEditTodo(e.target.value);
              }}
            />
          ) : (
            <p className={`todolist__text ${item.isDone ? "completed" : ""}`}>
              {item.todo}
            </p>
          )}

          <div className="todolist__icons">
            <FaEdit onClick={handleEdit} />
            <IoIosRemoveCircle onClick={() => handleRemove(item.id)} />
            <FaCheck onClick={() => handleCheck(item.id)} />
          </div>
        </form>
      )}
    </Draggable>
  );
};

export default SingleTodoItemComponent;
