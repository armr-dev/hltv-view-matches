import React, { Component } from "react";
import { Input, Card, Icon, Button } from "semantic-ui-react";
import SemanticDatepicker from "react-semantic-ui-datepickers";

import Match from "../../components/Match";

import "../../styles/matchesViewer.css";

export default class MatchesViewer extends Component {
  state = {
    matches: [],
    fixedMatches: [],
    filterVisible: true,
    searchTerm: "",
    selectedDate: [],
    defaultDate: [],
  };

  componentDidMount() {
    const matches = JSON.parse(localStorage.getItem("matches"));

    console.log("MATCHES: ", matches);

    if (matches === null) {
      return;
    } else {
      const fixedMatches = [...matches];
      const selectedDate = [matches[0].date, matches[matches.length - 1].date];
      const defaultDate = [...selectedDate];
      this.setState({ matches, fixedMatches, selectedDate, defaultDate });
    }
  }

  searchTeam = (e) => {
    const { fixedMatches } = this.state;
    const searchTerm = e.target.value;
    this.setState({ searchTerm });

    let newMatches;
    var re = new RegExp(searchTerm, "gi");
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

    this.setState({ matches: newMatches });
  };

  searchEvent = (e) => {
    const searchEvent = e.target.value;

    this.setState({ searchEvent });
  };

  selectDate = (e, data) => {
    const { defaultDate } = this.state;
    let selectedDate = data.value;

    if (selectedDate === null) {
      selectedDate = [...defaultDate];

      this.setState({ selectedDate });
    } else if (selectedDate.length > 1) {
      selectedDate[1].setDate(selectedDate[1].getDate() + 1);

      this.setState({ selectedDate });
    }
  };

  filter = () => {
    const { fixedMatches, selectedDate, searchEvent } = this.state;
    var re = new RegExp(searchEvent, "gi");

    let newMatches = fixedMatches.filter((item) => {
      if (selectedDate === null || selectedDate.length === 1) {
        return fixedMatches;
      } else if (item.date >= selectedDate[0] && item.date <= selectedDate[1]) {
        return item;
      }
    });

    newMatches = newMatches.filter((item) => {
      if (item.event !== undefined) {
        return item.event.name.match(re);
      } else {
        return item.title.match(re);
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
                this.searchTeam(e);
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
                className="event-input"
                clear
                onChange={(e) => {
                  this.searchEvent(e);
                }}
              />
              <SemanticDatepicker
                className="datepicker"
                minDate={Date.now() - 86400000} // calcula o dia anterior
                format={"MMMM, Do - YYYY"}
                placeholder="Select dates"
                type="range"
                pointing="right"
                datePickerOnly
                onChange={(e, data) => {
                  this.selectDate(e, data);
                }}
              />
              <Button onClick={this.filter} className="filter-btn">
                Filter
              </Button>
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
