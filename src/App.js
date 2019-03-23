import React, { Component } from 'react';
import './App.css';
import createRoute from '@src/createRoute';
import { BrowserRouter as Router } from "react-router-dom";
import routerConfig from '@configs/routerConfig'


class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          {createRoute(routerConfig, '', true)}
        </div>
      </Router>
    );
  }
}

export default App;
