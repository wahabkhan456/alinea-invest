import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/HomeComponent";
import Watchlist from "./pages/WatchListComponent";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={() => <Home />} />
        <Route exact path="/watchlist" component={() => <Watchlist />} />
      </Switch>
    </Router>
  );
}

export default App;
