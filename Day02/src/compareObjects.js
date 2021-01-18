function compareObjects (objOne, objTwo) {
    let keysOne = Object.keys(objOne);
    let keysTwo = Object.keys(objTwo);

    let result = true;

    if(keysOne.length !== keysTwo.length) {
        result = false;
    } else {
        for( let key of keysOne) {
            if(satu[key] !== dua[key]) {
                result = false;
            }
        }
    }
    return result;
}

// let satu = {
//     one : 1, 
//     two : 2
// }

// let dua = {
//     two : 2,
//     one : 1
// }

// console.log(compareObjects(satu, dua));

// export functionnya 
export default compareObjects;