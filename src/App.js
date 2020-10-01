import React from "react";

import Header from "./components/Header";
import MatchesViewer from "./pages/MatchesViewer";
import "semantic-ui-css/semantic.min.css";

function App() {
  return (
    <div>
      <Header />
      <MatchesViewer />
    </div>
  );
}

export default App;
