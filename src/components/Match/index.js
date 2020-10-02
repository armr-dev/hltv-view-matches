import React, { Component } from "react";

import { Card } from "semantic-ui-react";
import HLTV from "hltv";

export default class Match extends Component {
  state = {
    teamNames: [],
    teamsId: [],
  };

  fetchTeams = async (teamsId) => {
    let teams = [];

    const myHLTV = HLTV.createInstance({
      hltvUrl: "https://cors-anywhere.herokuapp.com/https://www.hltv.org",
    });

    for (let i = 0; i < 2; i++) {
      if (teamsId[i])
        teams.push(await myHLTV.getTeam({ id: teamsId[i] }).then((res) => res));
      else teams.push(null);
    }
  };

  generateMatchLink = (match) => {
    const baseUrl = `https://hltv.org/matches/${match.id}/`;

    const team1 = match.team1.name.replace(/[\s/]/g, "-") + "-vs-";
    const team2 = match.team2.name.replace(/[\s/]/g, "-") + "-";
    const event = match.event.name.replace(/[\s/]/g, "-");

    const finalUrl = (baseUrl + team1 + team2 + event).toLowerCase();

    return finalUrl;
  };

  handleClick = () => {
    let { match } = this.props;

    if (match.team1 !== undefined) {
      window.open(this.generateMatchLink(match), "_blank");
    }
  };

  formatTime = (date) => {
    let hours = date.getHours();
    let minutes = date.getMinutes();

    if (hours < 10) {
      hours = "0" + hours;
    }

    if (minutes < 10) {
      minutes = "0" + minutes;
    }

    console.log("HOURS: ", hours);

    return hours + ":" + minutes;
  };

  render() {
    let { match } = this.props;
    const date = new Date(match.date);

    return (
      <Card onClick={this.handleClick}>
        <Card.Content>
          <Card.Header>
            {(match.team1 !== undefined ? match.team1.name : "Undefined") +
              " vs. " +
              (match.team2 !== undefined ? match.team2.name : "Undefined")}
          </Card.Header>
          <Card.Meta>{match.event ? match.event.name : match.title}</Card.Meta>
          <Card.Content>
            {!isNaN(date) ? (
              <div className="card-content">
                <div className="date-wrapper">
                  <div className="month">
                    {new Intl.DateTimeFormat("en-US", { month: "long" }).format(
                      date
                    )}
                  </div>
                  <div className="day">{date.getDate()}</div>
                  <div className="year">{date.getFullYear()}</div>
                </div>
                <div className="time">{this.formatTime(date)}</div>
              </div>
            ) : (
              <div className="happening-wrapper">Happening now!</div>
            )}
          </Card.Content>
        </Card.Content>
      </Card>
    );
  }
}
