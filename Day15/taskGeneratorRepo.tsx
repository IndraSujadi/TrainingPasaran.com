import fetch from "node-fetch";

type action =
  | {
      type: string;
      ms: number;
    }
  | {
      type: string;
      url: string;
    };

function* getUserRepos(userId: string) {
  yield { type: "WAIT", ms: 200 };
  const repos = yield {
    type: "FETCH",
    url: `https://api.github.com/users/${userId}/repos`,
  };
  yield { type: "WAIT", ms: 300 };
  return repos.map((repo: { name: string }) => repo.name);
}

function run(generator: Generator) {
  return new Promise((resolve) => {
    function doNext(data: any) {
      const { done, value } = generator.next(data);
      console.log(done);
      console.log(value);
      if (value && done == false) {
        if (value.type == "WAIT") {
          setTimeout(() => {
            doNext(undefined);
          }, value.ms);
        } else if (value.type == "FETCH") {
          fetch(value.url)
            .then((response) => response.json())
            .then((data) => {
              doNext(data);
            });
        }
      } else {
        resolve(value);
      }
    }

    doNext(undefined);
  });
}
// run(getUserRepos("IndraSujadi"));
const promise: Promise<any> = run(getUserRepos("IndraSujadi"));

promise.then((result) => {
  console.log(result);
});
