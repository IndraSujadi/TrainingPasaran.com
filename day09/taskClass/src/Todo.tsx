import React from "react";
import { TodoItem } from "./state";

type Props = {
  item: TodoItem;
  toggleDone: (id: string) => void;
};

export function Todo(props: Props) {
  let { item, toggleDone } = props;
  let content = item.isDone ? <s>{item.content}</s> : item.content;
  return <li onClick={() => toggleDone(item.id)}>{content}</li>;
}
