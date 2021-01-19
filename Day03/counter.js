// Buat private variables/ closure bernama count, yang didalamanya berisi fungsi increment dan decrement

function createCounter() {
    let count = 0; // private state
    return {
        inc : () => {count +=1; },
        dec : () =>{count -=1;},
        getCount : () => count
    }
}

let counter = createCounter();
// counter.inc();
// counter.inc();
// counter.inc();
// counter.inc();
// counter.dec();

console.log(counter.getCount());

//  *latihan pakai jest

// it('should increment', () =>{
//     let count = 0;
//     counter.inc();
//     expect(counter.getCount()).toEqual(1);
// });

// it('should decrement', () =>{
//     let count = 0;
//     counter.dec();
//     expect(counter.getCount()).toEqual(-1);
// });