import React from "react";

import Header from "./components/Header";
import MatchesViewer from "./pages/MatchesViewer";
import "semantic-ui-css/semantic.min.css";
import "react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css";

function App() {
  return (
    <div>
      <Header />
      <MatchesViewer />
    </div>
  );
}

export default App;
