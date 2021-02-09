import { string } from "prop-types";
import React, { Component } from "react";
import ListItem from "../ListItem";

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {};

type State = {
  searchUsername: string;
  reposResult: Array<string>;
  show: {
    display: string;
  };
};

export default class App extends Component<Props, State> {
  state = {
    searchUsername: "",
    reposResult: [],
    show: {
      display: "none",
    },
  };

  _onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value;

    this.setState({
      searchUsername: searchValue,
    });
  };

  _onClick = async () => {
    const { searchUsername, reposResult } = this.state;
    if (searchUsername !== "") {
      const url = `https://api.github.com/users/${searchUsername}/repos`;
      const reposPromise = fetch(url)
        .then((response) => response.json())
        .then((data) => data);
      this.setState((currentState) => ({ show: { display: "block" } }));
      const repos = await reposPromise;
      setTimeout(() => {
        const data = repos.map((repo: { name: string }) => repo.name);
        // const result = await getUserRepos(searchUsername);
        this.setState((currentState) => ({
          reposResult: data,
          searchUsername: "",
          show: { display: "none" },
        }));
      }, 2000);
    }
  };

  render() {
    const { searchUsername, reposResult, show } = this.state;
    return (
      <div>
        <input
          onChange={this._onChange}
          placeholder="Input GitHub Username..."
          value={searchUsername}
        />
        <button onClick={this._onClick}>Search</button>

        <h3>Repositories</h3>
        <div className="loader" style={show}>
          Loading...
        </div>
        <ul>
          {reposResult.map((repo, index) => (
            <ListItem key={index} Item={repo} />
          ))}
        </ul>
      </div>
    );
  }
}
