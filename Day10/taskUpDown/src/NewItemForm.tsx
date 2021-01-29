import React, { Component } from "react";

type Props = {
  addNewItem: () => void;
  onInput: (text: string) => void;
  inputValue: string;
};

export function NewItemForm(props: Props) {
  let { addNewItem, onInput, inputValue } = props;
  let onChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    onInput(event.target.value.toString());

  return (
    <div>
      <button onClick={addNewItem}>Save</button>
      <input type="text" value={inputValue} onChange={onChange} />
    </div>
  );
}
