import React from "react";

import { Todo } from "../module";

import "./styles.scss";

import SingleTodoItemComponent from "./SingleTodoItemComponent";
import { Droppable } from "react-beautiful-dnd";

interface TodoListComponentProps {
  todoList: Todo[];
  setTodoList: React.Dispatch<React.SetStateAction<Todo[]>>;
  completedTodoList: Todo[];
  setCompletedTodoList: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoListComponent: React.FC<TodoListComponentProps> = ({
  todoList,
  setTodoList,
  completedTodoList,
  setCompletedTodoList,
}) => {
  return (
    <div className="container">
      <Droppable droppableId="TodosList">
        {(provided) => (
          <div
            className="todolist"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <p className="todolist__title">todo tasks:</p>
            {todoList.map((item, index) => {
              return (
                <SingleTodoItemComponent
                  item={item}
                  key={item.id}
                  todoList={todoList}
                  setTodoList={setTodoList}
                  index={index}
                />
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Droppable droppableId="RemoveList">
        {(provided) => (
          <div
            className="todolist removed"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <p className="todolist__title">completed tasks:</p>
            {completedTodoList.map((item, index) => {
              return (
                <SingleTodoItemComponent
                  item={item}
                  key={item.id}
                  todoList={completedTodoList}
                  setTodoList={setCompletedTodoList}
                  index={index}
                />
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TodoListComponent;
