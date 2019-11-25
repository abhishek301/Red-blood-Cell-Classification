import React, { Component } from "react";
import Postslist from "./Components/postsList";
import Favourite from "./Components/favourite";
import Nav from "./Components/Nav";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Nav />
          <Switch>
            <Route path="/" exact component={Postslist} />
            <Route path="/favourite" component={Favourite} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
