import React, { Component } from "react";
import { Input, Card } from "semantic-ui-react";

import Match from "../../components/Match";

import "../../styles/matchesViewer.css";

export default class MatchesViewer extends Component {
  state = {
    matches: [],
    fixedMatches: [],
    searchTerm: "",
  };

  componentDidMount() {
    const matches = JSON.parse(localStorage.getItem("matches"));

    if (matches === null) {
      return;
    } else {
      const fixedMatches = [...matches];
      this.setState({ matches, fixedMatches });
    }
  }

  filterData = (e) => {
    const { fixedMatches } = this.state;
    const searchTerm = e.target.value;
    this.setState({ searchTerm });

    var re = new RegExp(searchTerm, "gi");

    let newMatches = fixedMatches.filter((item) => {
      if (item.team1 && item.team2 !== undefined) {
        return item.team1.name.match(re) || item.team2.name.match(re);
      } else if (item.team1 !== undefined) {
        return item.team1.name.match(re);
      } else if (item.team2 !== undefined) {
        return item.team2.name.match(re);
      } else {
        if (searchTerm === "") {
          return item;
        }
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
            onChange={this.filterData}
          />
          <p>
            {matches.length} matches were found.{" "}
            {matches.length === 0
              ? "No matches fetched. Please, click the 'Fetch Matches' button."
              : null}
          </p>
        </div>
        <div className="content-wrapper">
          <Card.Group centered>
            {matches.map((item) => {
              return <Match match={item} />;
            })}
          </Card.Group>
        </div>
      </div>
    );
  }
}
