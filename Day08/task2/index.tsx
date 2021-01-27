import * as React from 'react';
import * as ReactDOM  from 'react-dom';
import App from './app';
import {getState} from './state';

let body = document.body;

export function render() { 
    let state = getState();
    if(body){
        ReactDOM.render(<App state={state}/>, document.body);
    }
}
render();


