class EventEmitter{
    listenerList = new Map();
    addListener (eventName :string, fn: Function){
        this.listenerList.set(eventName, fn);
    }

    emit (eventName: string) {
        this.listenerList.get(eventName)();
    }

}

let myEmitter = new EventEmitter();

myEmitter.addListener('login',()=>{console.log(`You're logged in!`)});
myEmitter.addListener('exp',()=>{console.log(`your exp : 5000`);});
myEmitter.emit('login');
myEmitter.emit('exp');

// * nyoba bukan class
// let listenerList = new Map();
    
// function addListener (eventName :string, fn: Function){
//     this.listenerList.set(eventName, fn);
// }

// function emit (eventName: string) {
//     console.log(listenerList.get(eventName));
// }


