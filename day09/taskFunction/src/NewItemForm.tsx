import React, { Component } from "react";

type Props = {
  addNewItem: (newItem: string) => void;
  onClear: () => void;
  onInput: (text: string) => void;
  inputValue: string;
};

export function NewItemForm(props: Props) {
  let { addNewItem, onClear, onInput, inputValue } = props;
  //  untuk ambil nilai inputnya
  let onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onInput(event.target.value.toString());
  };
  let onSave = () => {
    addNewItem(inputValue);
    onClear();
  };
  return (
    <div>
      <input type="text" value={inputValue} onChange={onChange}></input>
      <button onClick={onSave}>Save</button>
    </div>
  );
}
