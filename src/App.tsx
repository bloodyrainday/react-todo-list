import React from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

import "./App.scss";

import InputComponent from "./components/InputComponent";
import TodoListComponent from "./components/TodoListComponent";

import { Todo } from "./module";

const App: React.FC = () => {
  const [todo, setTodo] = React.useState<string>("");
  const [todoList, setTodoList] = React.useState<Todo[]>([]);
  const [completedTodoList, setCompletedTodoList] = React.useState<Todo[]>([]);
  console.log("todo", todo);
  console.log("todo list", todoList);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo) {
      setTodoList([...todoList, { id: Date.now(), todo, isDone: false }]);
      setTodo("");
    }
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    console.log(result);
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;
    let add,
      active = todoList,
      complete = completedTodoList;

    if (source.droppableId === "TodosList") {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }

    if (destination.droppableId === "TodosList") {
      active.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 0, add);
    }

    setCompletedTodoList(complete);
    setTodoList(active);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="app">
        <span className="heading">task list</span>
        <InputComponent setTodo={setTodo} todo={todo} handleAdd={handleAdd} />
        <TodoListComponent
          todoList={todoList}
          setTodoList={setTodoList}
          completedTodoList={completedTodoList}
          setCompletedTodoList={setCompletedTodoList}
        />
      </div>
    </DragDropContext>
  );
};

export default App;
