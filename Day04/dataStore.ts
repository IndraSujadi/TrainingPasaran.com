// type Records = {itemName:string;price:number};
type DataType = {[itemId:string] : {itemName:string;price:number}};

type ForEach = (item:string, price:number) => any;

class DataStore {
    data: DataType = {};
    // constructor() {

    // }

    set( item: string, price: number)  {
        // simpan data 
         this.data[item] = {itemName: item, price: price}
    }

    get(item: string) {
        // Return  value of the key
        console.log(this.data[item]) ;
    }

    forEach(fn : ForEach) {
        let keys = Object.keys(this.data);
        for(let key of keys) {
            fn(key, this.data[key].price);
        }
    }

}

let d = new DataStore();

d.set('Apple', 12000);
d.set('Grape', 25000);

console.log(`Hasil method get`);
d.get('Grape');
d.get('Apple');

console.log(`Hasil method forEach`);
d.forEach((item, price) => {
    console.log(item, ':', price)
});

// untuk lihat isi dari dictionary nya (data)
// console.log(d.data);