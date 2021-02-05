function sleep(ms: number) {
  const sleepPromise = new Promise((resolve) => {
    setTimeout(() => {
      resolve(ms);
    }, ms);
  });
  return sleepPromise;
}

const promise = sleep(5000);

promise.then((time) => console.log(time));
