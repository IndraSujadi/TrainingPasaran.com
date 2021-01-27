const globalAny:any = global;
import type {State} from './types/State';
import {renderApp} from './app';
import {eventHandlers} from './eventHandlers';
import initialState from './initialState';

let state = initialState;

globalAny.emitEvent = (eventName: string, id: string) => {
    let eventHandler = eventHandlers[eventName];
    if(eventHandler) {
        state = eventHandler(state, id);
    }
    render();
}


function render() {
    let html = renderApp(state);
    if(document.body) {
        document.body.innerHTML = html;
    }
}
render();