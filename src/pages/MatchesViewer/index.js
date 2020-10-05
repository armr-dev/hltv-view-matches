import React, { Component } from "react";
import { Input, Card, Icon } from "semantic-ui-react";
import SemanticDatepicker from "react-semantic-ui-datepickers";

import Match from "../../components/Match";

import "../../styles/matchesViewer.css";

export default class MatchesViewer extends Component {
  state = {
    matches: [],
    fixedMatches: [],
    filterVisible: true,
    searchTerm: "",
  };

  componentDidMount() {
    const matches = JSON.parse(localStorage.getItem("matches"));

    console.log("MATCHES: ", matches);

    if (matches === null) {
      return;
    } else {
      const fixedMatches = [...matches];
      this.setState({ matches, fixedMatches });
    }
  }

  filterData = (e, name) => {
    const { fixedMatches } = this.state;
    const searchTerm = e.target.value;
    this.setState({ searchTerm });

    let newMatches;
    var re = new RegExp(searchTerm, "gi");
    if (name === "team") {
      newMatches = fixedMatches.filter((item) => {
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
          return "";
        }
      });
    } else if (name === "event") {
      newMatches = fixedMatches.filter((item) => {
        if (item.event !== undefined) {
          return item.event.name.match(re);
        } else {
          return item.title.match(re);
        }
      });
    }

    this.setState({ matches: newMatches });
  };

  filterByDate = (e, data) => {
    const { fixedMatches } = this.state;
    const selectedDate = data.value;

    if (selectedDate.length !== 1) {
      selectedDate[1].setDate(selectedDate[1].getDate() + 1);
    }

    this.setState({ selectedDate });

    let newMatches = fixedMatches.filter((item) => {
      if (selectedDate === null || selectedDate.length === 1) {
        return fixedMatches;
      } else if (item.date >= selectedDate[0] && item.date <= selectedDate[1]) {
        return item;
      }
    });

    this.setState({ matches: newMatches });
  };

  render() {
    let { fixedMatches, matches, filterVisible } = this.state;

    return (
      <div className="main-wrapper">
        <div className="search-filter-wrapper">
          <div className="search-wrapper">
            <Input
              icon="search"
              placeholder="Search matches by team name."
              className="search-input"
              onChange={(e) => {
                this.filterData(e, "team");
              }}
            />
            <Icon
              link
              circular
              inverted
              color="black"
              name="filter"
              onClick={() => {
                this.setState({ filterVisible: !filterVisible });
              }}
            />
          </div>
          {filterVisible ? (
            <div className="filter-wrapper">
              <Input
                icon="search"
                placeholder="Search matches by event."
                className="search-input"
                onChange={(e) => {
                  this.filterData(e, "event");
                }}
              />
              <SemanticDatepicker
                minDate={Date.now() - 86400000} // calcula o dia anterior
                format={"MMMM, Do - YYYY"}
                placeholder="Initial date"
                type="range"
                pointing="right"
                onChange={(e, data) => {
                  this.filterByDate(e, data);
                }}
              />
            </div>
          ) : null}
          <p>
            {matches.length} matches were found.{" "}
            {fixedMatches.length === 0
              ? "No matches fetched. Please, click the 'Fetch Matches' button."
              : null}
          </p>
        </div>
        <div className="content-wrapper">
          <Card.Group centered>
            {matches.map((item) => {
              return <Match match={item} key={item.id} />;
            })}
          </Card.Group>
        </div>
      </div>
    );
  }
}
