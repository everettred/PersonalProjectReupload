import React, { Component } from "react";
import "./App.css";
import Routes from "./routes";
import Nav from "./components/Header/Nav";

class App extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <section>
        <Nav />
        <section id="route-space">{Routes}</section>
      </section>
    );
  }
}
export default App;
