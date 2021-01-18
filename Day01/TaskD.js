
let students = [
    {name: "Indra", university: "UMN"},
    {name: "Sujadi", university: "UMN"},
    {name: "Aldo",university: "Surya"}
];

function pluck(arrayOfObjects, propertyName) {
    let propetyValues = [];
    for(let student of students) {
        propetyValues.push(student[propertyName]); 
    }
    return propetyValues;
}

let result = pluck(students,'university');
console.log(result);
