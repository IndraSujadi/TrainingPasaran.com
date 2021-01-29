import React, { Component } from "react";

type Props = {
  addNewItem: (newItem: string) => void;
  onClear: () => void;
  onInput: (text: string) => void;
  inputValue: string;
};

export class NewItemForm extends Component<Props> {
  render() {
    let onChange = (event: React.ChangeEvent<HTMLInputElement>) =>
      this.props.onInput(event.target.value.toString());
    let onSave = () => {
      this.props.addNewItem(this.props.inputValue);
      this.props.onClear();
    };

    return (
      <div>
        <button onClick={onSave}>Save</button>
        <input type="text" value={this.props.inputValue} onChange={onChange} />
        {console.log(this.state)}
      </div>
    );
  }
}
