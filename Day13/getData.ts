// curl -i url ini untuk coba komunikasi sama url nya dulu di terminal
// module untuk bisa melakukan fetsh melalui node
import fetch from "node-fetch";

let repoName;
let repoSubscriber;

fetch("https://api.github.com/orgs/Microsoft/repos")
  .then((response) => {
    console.log("status:", response.status);
    if (response.status !== 200) {
      throw new Error("Unexpected status");
    }
    let contentType = response.headers.get("Content-Type");
    if (contentType !== "application/json; charset=utf-8") {
      throw new Error("Unexpexted content type.");
    }
    // setelah cek status dan tipe data atau content yang diterima barulah ambil datanya
    let promise = response.json();
    return promise;
  })
  .then((jsonData) => {
    let repositories = jsonData.map((repo: { name: string }) => {
      return repo.name;
    });
    repoName = repositories;
    return repositories;
  })
  .then((repositories) => {
    let repositoriesUrl = repositories.map((repo: string) => {
      let url = "https://api.github.com/repos/Microsoft/" + repo;
      return url;
    });
    return repositoriesUrl;
  })
  .then((repositoriesUrl) => {
    let subscribersUrl = repositoriesUrl.map((repoUrl: string) => {
      let subcribersUrl = repoUrl + "/subscribers";
      return subcribersUrl;
    });
    return subscribersUrl;
  })
  .then((subscribersUrl) => {
    subscribersUrl.map((subscriberUrl: string) => {
      fetch(subscriberUrl)
        .then((response) => {
          if (response.status !== 200) {
            throw new Error("Unexpected Status");
          }
          if (
            response.headers.get("Content-Type") !==
            "application/json; charset=utf-8"
          ) {
            throw new Error("Unexpected Content");
          }

          return response.json();
        })
        .then((subscriberData) => {
          let totalSubs = subscriberData.length;
          console.log(totalSubs);
          // repoSubscriber = totalSubs;
        });
    });
  });
// fetch("https://api.github.com/repos/Microsoft/car-trumps"); done
// fetch("https://api.github.com/repos/microsoft/car-trumps/subscribers");
