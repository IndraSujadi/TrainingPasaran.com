import * as React from 'react';
import { isDoStatement } from 'typescript';
import type {State, TodoItem} from './state';
import {updateState} from './state';

type Props = {
    state: State
}

type ItemProps = {
    item: TodoItem,
    toggleDone: (id:string) => void
}


function Todo(props: ItemProps) {
    let {item, toggleDone} = props;
    let content = item.isDone ? <s>{item.content}</s> : item.content;
    return (
        <li 
        onClick={() => 
            toggleDone(item.id)
        }>
            {content}
        </li>
    );
}

function App (props: Props) {
    let {state} = props;
    let {todoItems} = state;
    let toggleDone = (id: string) =>{
        let newTodoItem = todoItems.map( (item) => {
            if(item.id == id) {
                return {...item, isDone: !item.isDone}
            } else {
                return item;
            }
        });
        updateState(
            {...state,todoItems: newTodoItem}
        )
    }
    // function untuk nampung inputan
    let onTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let textValue = event.target.value;
        updateState({
            ...state, inputValue: textValue
        });
    }

    // fucntion untuk simpan inputan
    let addNewItem = () =>{
        let {inputValue} = state;
        let newTodoItems = {
            id: Math.random().toString(),
            content: inputValue.toString(),
            isDone: false,
        };
        updateState({
            ...state, todoItems: [...todoItems,newTodoItems],
            inputValue: ''
        });


    }
    return (
        <div>
            <ul>
            {todoItems.map((item) => (
                <Todo key={item.id}item={item} toggleDone={toggleDone} />))}
            </ul>  
            <input type="text" value={state.inputValue} onChange={onTextChange}/>
            <button onClick={addNewItem}>Save</button>  
        </div>
         
    );
    

}

export default App;