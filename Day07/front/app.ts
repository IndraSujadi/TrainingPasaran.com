import type {State} from './types/State';

function renderButton(state: State) {
    // let html=`<button onClick="emitEvent('done')">Done</button>>`;
    let html = ``;
    let todo = state.todoItems;
    for(let t of todo) {
        if(t.isDone ===  false) {
            html += `<text>${t.name} </text><button id=${t.id} onClick="emitEvent('done',${t.id})">Done</button>  <br>`;
        } else {
            html += `<text><s>${t.name}</s> </text><button id=${t.id} onClick="emitEvent('undone',${t.id})">ulangi</button>  <br>`; 
        }  
    }
    return html;
}

export function renderApp(state: State) {
    let html = `${renderButton(state)}`;   
    return `
    <p>Hello, This is your todo list !</p>
    ${html}
    `;
}

// <button onClick="emitEvent('increaseCount')">Increase</button>
// <button onClick="emitEvent('decreaseCount')">decrease</button>
