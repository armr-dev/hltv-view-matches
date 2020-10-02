import React, { Component } from "react";
import { Button } from "semantic-ui-react";
import HLTV from "hltv";

import "../../styles/header.css";

export default class Header extends Component {
  state = {
    lastFetch: null,
  };

  fetchMatches = async () => {
    const myHLTV = HLTV.createInstance({
      hltvUrl: "https://cors-anywhere.herokuapp.com/https://www.hltv.org",
    });
    const matches = await myHLTV.getMatches().then((res) => res);
    localStorage.setItem("matches", JSON.stringify(matches));
    localStorage.setItem("lastFetch", Date.now());
    window.location.reload(false);
  };

  formatDate = () => {};

  render() {
    const lastFetch = new Date(parseInt(localStorage.getItem("lastFetch")));

    return (
      <div className="header-wrapper">
        <div className="title">HLTV - Matches Viewer</div>
        <div className="fetch-wrapper">
          {lastFetch.toString() === "Invalid Date" ? null : (
            <div className="fetch-text-wrapper">
              <div className="fetch-text">Last Updated at:</div>
              <div className="fetch-text">
                {new Intl.DateTimeFormat("en-US", { month: "long" }).format(
                  lastFetch
                ) +
                  ", " +
                  lastFetch.getDate() +
                  ", " +
                  lastFetch.getFullYear()}
              </div>
              <div className="fetch-text">
                {lastFetch.getHours() +
                  "h" +
                  lastFetch.getMinutes() +
                  "m" +
                  lastFetch.getSeconds() +
                  "s"}
              </div>
            </div>
          )}
          <Button
            color="green"
            onClick={this.fetchMatches}
            style={{ height: "36px" }}
          >
            Fetch Matches
          </Button>
        </div>
      </div>
    );
  }
}
