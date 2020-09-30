import React, { Component } from "react";
import { Button } from "semantic-ui-react";
import HLTV from "hltv";

import "../../styles/header.css";

export default class Header extends Component {
  fetchMatches = async () => {
    const myHLTV = HLTV.createInstance({
      hltvUrl: "https://cors-anywhere.herokuapp.com/https://www.hltv.org",
    });
    const matches = await myHLTV.getMatches().then((res) => res);
    localStorage.setItem("matches", JSON.stringify(matches));
  };

  render() {
    return (
      <div className="header-wrapper">
        <div className="title">HLTV - Matches Viewer</div>
        <Button onClick={this.fetchMatches}>Fetch Matches</Button>
      </div>
    );
  }
}
