// Task Generator : Fibbonacci

function* fibbonacci() {
  const x = [0, 0];
  while (true) {
    const result = yield x[1];
    if (x[0] + x[1] === 0) {
      x[1] = 1;
    } else {
      const temp = x[1];
      x[1] = x[0] + x[1];
      x[0] = temp;
    }
  }
}

const fibGen = fibbonacci();

const buttons = document.createElement("button");
buttons.appendChild(document.createTextNode("Next Fib!"));
buttons.addEventListener("click", () => {
  const value = fibGen.next();
  console.log(value);
});

document.body.appendChild(buttons);
