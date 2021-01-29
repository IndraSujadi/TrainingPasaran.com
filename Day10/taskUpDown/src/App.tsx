import React, { Component, KeyboardEventHandler } from "react";
import { isDoStatement } from "typescript";
import type { State, TodoItem } from "./state";
import { Todo } from "./Todo";
import { NewItemForm } from "./NewItemForm";

// alasan membuat kompen dengan menggunakan class
// 1. Jika kita membutuhkan sebuah lifesycle method
// 2. Jika kita membutuhkan set State / local state

//
type Props = {
  color: string;
};

// contoh class untuk localstate
class App extends Component<Props, State> {
  state = {
    todoItems: [
      { id: "1", content: "Training", isDone: false },
      { id: "2", content: "Make a Report", isDone: false },
      { id: "3", content: "Exercise", isDone: false },
    ],
    inputValue: "",
    searchKey: "",
    selectedIndex: 0,
  };

  componentDidMount() {
    // add an event listener to
    document.addEventListener("keydown", this.onKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.onKeyDown);
  }

  onKeyDown = (event: KeyboardEvent) => {
    let { selectedIndex, todoItems } = this.state;
    let index = selectedIndex;
    let maxIndex = todoItems.length - 1;
    let newIndex = index;
    if (event.key === "ArrowUp") {
      // newIndex = index === 0 ? index : index - 1;
      newIndex = Math.max(0, index - 1);
    }
    if (event.key === "ArrowDown") {
      // newIndex = index === maxIndex ? index : index + 1;
      newIndex = Math.min(maxIndex, index + 1);
    }
    if (newIndex !== index) {
      this.setState({ selectedIndex: newIndex });
    }

 
  };

  toggleDone = (id: string) => {
    let newTodoItems = this.state.todoItems.map((item) => {
      if (item.id === id) {
        return (item = { ...item, isDone: !item.isDone });
      } else {
        return (item = item);
      }
    });
    this.setState({
      todoItems: newTodoItems,
    });
  };

  addNewItem = () => {
    let { todoItems, inputValue } = this.state;
    let newTodoItems = {
      id: Math.random().toString(),
      content: inputValue,
      isDone: false,
    };
    this.setState({
      todoItems: [...todoItems, newTodoItems],
      inputValue: "",
    });
  };

  onInput = (text: string) => {
    this.setState({
      inputValue: text,
    });
  };

  render() {
    let { todoItems, searchKey, selectedIndex } = this.state;

    let onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      this.setState({
        searchKey: event.target.value.toString(),
      });
    };

    let filteredTodoItems;
    if (searchKey === "") {
      filteredTodoItems = todoItems;
    } else {
      let lowerSearchKey = searchKey.toLowerCase();
      filteredTodoItems = todoItems.filter((item) => {
        return item.content.toLowerCase().includes(lowerSearchKey);
      });
    }
    return (
      <div>
        <input type="text" placeholder="Search..." onChange={onChange} />
        <ul style={{ listStyle: "none", padding: 0 }}>
          {filteredTodoItems.map((item, index) => (
            <Todo
              key={item.id}
              item={item}
              isSelected={index === selectedIndex}
              toggleDone={this.toggleDone}
            />
          ))}
        </ul>

        <NewItemForm
          addNewItem={this.addNewItem}
          onInput={this.onInput}
          inputValue={this.state.inputValue}
        />
        {/* <button onClick={() => this.setState({ inputValue: "" })}>Clear</button> */}
      </div>
    );
  }
}

export default App;
