let StudentsData = new Map();

StudentsData.set('00000020873', {
    NIK : '00000020873' ,
    nama : 'Indra Sujadi',
    jurusan : 'Sistem Informasi',
    biaya : 1500000
});

StudentsData.set('00000020793', {
    NIK : '00000020793' ,
    nama : 'Dandi asd',
    jurusan : 'Sistem Informasi',
    biaya : 100000
});


function arrayFrom (iterable) {
    let result = [];
    for(let item of iterable) {
        result.push(item);
    }
    return result;
}

console.log(arrayFrom(StudentsData.keys()));

// OR 
// let array = [...StudentsData.keys()];
// console.log(array);


