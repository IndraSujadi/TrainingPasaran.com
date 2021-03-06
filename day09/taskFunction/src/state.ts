export type TodoItem = {
  id: string;
  content: string;
  isDone: boolean;
};

export type State = {
  todoItems: Array<TodoItem>;
  inputValue: string;
  searchKey: string;
};
