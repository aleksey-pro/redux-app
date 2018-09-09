import React, { Component } from "react";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div>
        <input type="text" className="trackInput" />
        <button className="addTrack">Add track</button>
        <ul className="list" />
      </div>
    );
  }
}

export default App;
