// Buat fungsi untuk mengecek apakah 2 Array itu sama atau tidak
let isEqual = (array1, array2) => {
    let result = true;

    if(array1.length == array2.length) {
        for(let i = 0; i < array2.length;i++) {
            if( result == true) {
                if(array1[i] !== array2[i]) {
                    result = false;
                }
            }
        }
    } else {
        result = false;
    }
    
    return (result);
}

let arr = [1,2,3];
let arr2 = [1,2,3];
console.log(isEqual(arr,arr2));
