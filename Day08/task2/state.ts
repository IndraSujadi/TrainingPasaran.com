import {render} from './index';

export type TodoItem = {
    id:string,
    content: string,
    isDone: boolean
}

export type State = {
    todoItems: Array<TodoItem>,
}

let state:State = {
    todoItems: [
        {id:'1', content:"Training", isDone: false},
        {id:'2', content:"Make a Report", isDone: false},
        {id:'3', content:"Exercise", isDone: false},
    ],
}

export function getState() {
    return state;
}

export function updateState(newState: State) {
    state = newState;
    render();
}