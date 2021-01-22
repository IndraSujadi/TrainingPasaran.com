let text = `
Hello, please visit my  web page https://myname.com/cool-article/test-ya.html

I also like the web page at http://example.com/wadidaw
`;

let regex = /(http|https):\/\/\w+\.[(?!-)a-z]+[\/\w-\.a-zA-Z]+/g;
let result = text.match(regex);
console.log(result);

// [\/\w-\.a-zA-Z]+ baru ini yang dipake
// \/[\w+-]+\.[a-zA-Z]+ lama