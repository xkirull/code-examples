import { createEvent, createStore, createEffect } from "effector";

export interface Todo {
  id: number;
  text: string;
  status: boolean;
}

export interface TodoListStore {
  todos: Todo[];
  newTodo: string;
}

export const removeTodo = (todos: Todo[], id: number): Todo[] => todos.filter((todo) => todo.id !== id);

export const addTodoToList = (todos: Todo[], text: string): Todo[] => [
  ...todos,
  {
    id: Math.max(0, Math.max(...todos.map(({ id }) => id))) + 1,
    text,
    status: false,
  },
];

export const saveTodo = (todos: Todo[]): void => {
  localStorage.setItem("data", JSON.stringify(todos));
};

export const updateTodo = (todos: Todo[], id: number, text: string): Todo[] =>
  todos.map((todo) => ({
    ...todo,
    text: todo.id === id ? text : todo.text,
  }));

export const toggleTodo = (todos: Todo[], id: number): Todo[] =>
  todos.map((todo) => ({
    ...todo,
    status: todo.id === id ? !todo.status : todo.status,
  }));

export const newElement = createEvent<string>();
export const add = createEvent<void>();
export const update = createEvent<{ id: number; text: string }>();
export const remove = createEvent<number>();
export const toggle = createEvent<number>();

export const loadTodoList = createEffect<void, Todo[], Error>(async () => {
  const storedTodoList = localStorage.getItem("data") || "[]";
  return JSON.parse(storedTodoList);
});

const $store = createStore<TodoListStore>({
  todos: [],
  newTodo: "",
})
  .on(loadTodoList.doneData, (state, todos) => ({ ...state, todos }))
  .on(newElement, (state, newTodo) => ({ ...state, newTodo }))
  .on(add, (state) => ({
    ...state,
    newTodo: "",
    todos: addTodoToList(state.todos, state.newTodo),
  }))
  .on(update, (state, { id, text }) => ({
    ...state,
    todos: updateTodo(state.todos, id, text),
  }))
  .on(remove, (state, id) => ({
    ...state,
    todos: removeTodo(state.todos, id),
  }))
  .on(toggle, (state, id) => ({
    ...state,
    todos: toggleTodo(state.todos, id),
  }));

$store.updates.watch(({ todos }) => saveTodo(todos));

export default $store;
