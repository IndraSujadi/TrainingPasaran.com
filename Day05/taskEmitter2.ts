type Method = { method: Function };

type EventMap = Map<string, Map<number,Method>>;

class EventEmitter{
    eventList: EventMap = new Map();
    addListener (eventName :string, fn: Function):number {
        let functionList = this.eventList.get(eventName);
        if(functionList == null){
            functionList = new Map();
            this.eventList.set(eventName,functionList);
        } 
        let id = functionList.size;
        functionList.set(id,{method:fn}); 
        // To Do : Make an id and save something
        
        return id;
    }

    // removeListener (eventName: string, fn: Function){
    //     let functionList = this.eventList.get(eventName);
    //     if(functionList) {
    //      functionList.delete(fn);   
    //     }  
    // }

    removeListenerById(eventName:string, id:number) {
        let functionList = this.eventList.get(eventName);
        functionList.delete(id);
    }

    emit (eventName: string) {
        let functionList = Array.from(this.eventList.get(eventName).values());
        // console.log(this.eventList.get(eventName));
        // functionList = Array.from(functionList);
        if(functionList) {
            for(let objItem of functionList) {
                console.log(functionList);
            //    let run =functionList.get(id);
            //    run.method();
            objItem.method();
            } 
        } else {
            console.log("Event belum dibuat!");
            
        }
    }

}

let myEmitter = new EventEmitter();

myEmitter.addListener('login',()=>{console.log(`You're logged in!`)});
let hello = myEmitter.addListener('login',()=>{console.log(`your exp : 5000`);});
myEmitter.removeListenerById('login', hello);
// myEmitter.removeListenerById('login', 1);
myEmitter.emit('login');
