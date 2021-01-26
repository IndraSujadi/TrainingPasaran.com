import type {State, Items} from './types/State';

function renderToDo(item: Items) {
    let content = item.isDone ? `<s>${item.name}</s>` : item.name;
    return `<li onClick="emitEvent('done', '${item.id}')">${content}</li>`;
    
}

export function renderApp(state: State) {
    return`
    <p>Hello,Its your To DO list</p>
    <ul>
        ${state.todoItems.map( (item) => renderToDo(item)).join('')}
    </ul>
    <input id="myInput" type="text" 
        value="${state.newItem}" 
        onInput="emitEvent('inputList', this.value)"
     />
    <button onClick="emitEvent('saveNewItem')">Save</button>
    `;
}

// <button onClick="emitEvent('increaseCount')">Increase</button>
// <button onClick="emitEvent('decreaseCount')">decrease</button>
