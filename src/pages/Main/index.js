import React, { Component } from "react";
import { Input, Card } from "semantic-ui-react";

import "../../styles/main.css";

export default class Main extends Component {
  state = {
    matches: [],
    fixedMatches: [],
    searchTerm: "",
  };

  componentWillMount() {
    const matches = JSON.parse(localStorage.getItem("matches"));
    const fixedMatches = matches;

    console.log("FIXED: ", matches);

    this.setState({ matches, fixedMatches });
  }

  updateSearch = async (e) => {
    await this.setState({ searchTerm: e.target.value });
    this.filterData();
  };

  filterData = () => {
    const { searchTerm, fixedMatches } = this.state;
    var re = new RegExp(searchTerm, "gi");
    const newMatches = fixedMatches.filter((item) => {
      if (item.team1 && item.team2 !== undefined) {
        return item.team1.name.match(re) || item.team2.name.match(re);
      } else if (item.team1 !== undefined) {
        return item.team1.name.match(re);
      } else if (item.team2 !== undefined) {
        return item.team2.name.match(re);
      } else {
        return "";
      }
    });
    this.setState({ matches: newMatches });
  };

  render() {
    let { matches } = this.state;
    return (
      <div className="main-wrapper">
        <div className="search-wrapper">
          <Input
            icon="search"
            placeholder="Type team name to add to the tracklist."
            className="search-input"
            onChange={this.updateSearch}
          />
          <p>{matches.length} matches were found.</p>
        </div>
      </div>
    );
  }
}
