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
        key={item.id} 
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
    return (
        <ul>
            {todoItems.map((item) => (
                <Todo item={item} toggleDone={toggleDone} />))}
        </ul>     
    );
    

}

export default App;