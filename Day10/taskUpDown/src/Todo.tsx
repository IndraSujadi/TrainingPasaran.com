import React from "react";
import { TodoItem } from "./state";

type Props = {
  item: TodoItem;
  isSelected: boolean;
  toggleDone: (id: string) => void;
};

const commonStyle = {
  margin: 0,
  padding: 3,
};

const unselectedStyle = {
  ...commonStyle,
  backgroundColor: "transparent",
  color: "black",
};

const selectedStyle = {
  backgroundColor: "#008000",
  color: "white",
};

export function Todo(props: Props) {
  let { item, toggleDone, isSelected } = props;
  let content = item.isDone ? <s>{item.content}</s> : item.content;
  let style = isSelected ? selectedStyle : unselectedStyle;
  return (
    <li style={style} onClick={() => toggleDone(item.id)}>
      {content}
    </li>
  );
}
