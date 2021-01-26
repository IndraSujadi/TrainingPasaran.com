import type {State} from './types/State';

type UpdateFunction = (state: State, id:string) => State
type EventHandlerObject = {[eventName: string]: UpdateFunction}

export let eventHandlers:EventHandlerObject = {
    done: (oldState, id) => {
        let newToDoItems = oldState.todoItems.map( (item) => {
            if(item.id === id) {
                return {...item, isDone: !item.isDone};
            } else{
                return item;
            }
        }); 
        return {...oldState, todoItems: newToDoItems};
    },
    inputList: (oldState, value) => {
        console.log({...oldState, newItem: value});
        return {...oldState, newItem: value};   
    },
    saveNewItem: (oldState) => {
        let newItem = {
            id: Math.random().toString(),
            name: oldState.newItem,
            isDone: false,
        } 
        let newToDoItems = [...oldState.todoItems, newItem];
        return {...oldState, todoItems: newToDoItems};
    }
    // increaseCount: (oldState) => {
    //     return {...oldState, count: oldState .count +1};
    // },
    // decreaseCount: (oldState) => {
    //     return {...oldState, count: oldState .count -1};
    // }  
};