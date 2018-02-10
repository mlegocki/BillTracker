import React, { Component } from 'react';
import { Button } from 'semantic-ui-react'
import AddBill from './AddBill';
import List from './List';
import logo from './Pay-Time.png';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      displayModal: false
    }
    this.toggleDisplay = this.toggleDisplay.bind(this);
  }
  toggleDisplay() {
    this.state.displayModal ? this.setState({ displayModal: false }) : this.setState({ displayModal: true });
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" />
          <h1 className="App-title">Welcome to Pay Time</h1>
        </header>
        <AddBill displayModal={this.state.displayModal} />
        <Button color='purple' onClick={this.toggleDisplay}>
          Add Bill Reminder
        </Button>
        <List />
      </div>
    );
  }
}

export default App;