import type {State} from './types/State';

let initialState : State = {
    todoItems:[
        {id: '4', name: 'Buy Oreos', isDone: false},
        {id: '9', name: 'Teach Bootcamp', isDone: false},
        {id: '1', name: 'Clean Laptop', isDone: false},
    ],
}

export default initialState;