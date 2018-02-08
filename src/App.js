/* global chrome */
import React, { Component } from 'react';
import { Button } from 'semantic-ui-react'
import AddBill from './AddBill';
import List from './List';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      displayPortal: false
    }
    this.toggleDisplay = this.toggleDisplay.bind(this);
  }
  toggleDisplay() {
    this.state.displayPortal ? this.setState({ displayPortal: false }) : this.setState({ displayPortal: true });
  }
  render() {
    // chrome.storage.sync.set({'test': 'string'});
    // console.log(chrome.storage);
    // chrome.storage.sync.get(null, function (data) { console.info(data) });
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Bill Tracker</h1>
        </header>
        <AddBill />
        <List />
      </div>
    );
  }
}

export default App;