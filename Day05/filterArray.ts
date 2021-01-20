function FilterArray<T,R>(arr: Array<T>, fn: (T) => R ): Array<R> {
    let result = [];
    for(let e of arr) {
        if(fn(e) !== undefined ) {
            result.push(fn(e));
        }
    }
    return result;
}

let arrNama = ['indra','sujadi','ani'];
let filter = FilterArray(arrNama, (item) => {
    if(item.length  > 3) {
        return item;
    } 
}
);

console.log(filter);

let x = arrNama.filter((a) => {
    if(a.length > 3) {
        return a;
    }
});

console.log(x);
