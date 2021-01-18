let arr = [1,2,3];

// // for.. of
// for(let e of arr) {
//     console.log(e);
// }

// //  forEach 
// arr.forEach(e => console.log(e));

// // map
// let newArray = arr.map(e =>  e*2 );
// console.log(newArray);

// tiap elemen array dikalikan 2
function map(array, fn) {
    let newArray = [];
    for(let x of array) {
        newArray.push(fn(x));
    }
    return newArray;
}

let result = map([1,2,3], (num) => num*2 );
console.log(result);


