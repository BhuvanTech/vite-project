import { useEffect, useState } from 'react';
import { Todo } from '../types/todo';
import { dummyData } from '../data/todos';

export default function useTodos() {
  const [todos, setTodos] = useState(() => {
    const savedTodos: Todo[] = JSON.parse(
      localStorage.getItem('todos') || '[]'
    );

    return savedTodos.length > 0 ? savedTodos : dummyData;
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  function setTodoCompleted(id: number, completed: boolean) {
    setTodos((preTodos) =>
      preTodos.map((todo) => (todo.id === id ? { ...todo, completed } : todo))
    );
  }

  function addTodo(title: string) {
    setTodos((prevTodos) => [
      { id: prevTodos.length + 1, title, completed: false },
      ...prevTodos,
    ]);
  }

  // function removeTodo(id: number) {
  //   setTodos((prevTodos) =>
  //     prevTodos.filter((todo) => {
  //       if (todo.id !== id) return todo;
  //     })
  //   );
  // }

  function deleteTodo(id: number) {
    setTodos((prevTodos) =>
      prevTodos.filter((todo) => {
        if (todo.id !== id) return todo;
      })
    );
  }

  function deleteAllCompleted() {
    setTodos((prevTodos) => prevTodos.filter((todo) => !todo.completed));
  }

  return { todos, addTodo, setTodoCompleted, deleteTodo, deleteAllCompleted };
}
