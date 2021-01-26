import type {State} from './types/State';

type UpdateFunction = (state: State, id:string) => State
type EventHandlerObject = {[eventName: string]: UpdateFunction}

export let eventHandlers:EventHandlerObject = {
    done: (oldState, id) => {
        let todo = oldState.todoItems;
        todo.forEach((t) =>{
            if(t.id == id) {
                t.isDone = true;
            }
        });
        return {...oldState};
    },
    undone: (oldState, id) => {
        let todo = oldState.todoItems;
        todo.forEach((t) =>{
            if(t.id == id) {
                t.isDone = false;
            }
        });
        return {...oldState};
    }
    // increaseCount: (oldState) => {
    //     return {...oldState, count: oldState .count +1};
    // },
    // decreaseCount: (oldState) => {
    //     return {...oldState, count: oldState .count -1};
    // }  
};