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

  render() {
    let { match } = this.props;

    const date = new Date(match.date);

    return (
      <Card>
        <Card.Content>
          <Card.Header>
            {(match.team1 !== undefined ? match.team1.name : "Undefined") +
              " vs. " +
              (match.team2 !== undefined ? match.team2.name : "Undefined")}
          </Card.Header>
          <Card.Meta>{match.event ? match.event.name : "Undefined"}</Card.Meta>
          <Card.Content className="card-content">
            <div className="date-wrapper">
              <div className="month">
                {new Intl.DateTimeFormat("en-US", { month: "long" }).format(
                  date
                )}
              </div>
              <div className="day">{date.getDate()}</div>
              <div className="year">{date.getFullYear()}</div>
            </div>
          </Card.Content>
        </Card.Content>
      </Card>
    );
  }
}
