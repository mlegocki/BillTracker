/* global chrome */
import React, { Component } from 'react';
import { Button } from 'semantic-ui-react'
import logo from './Pay-Time.png';
import './App.css';
import Bill from './Bill';
import EditBill from './EditBill';
import ListBill from './ListBill';
// import { updateBillList, deleteBill, toggleAddBillDisplay, toggleEditBillDisplay } from './utilsApp'

class App extends Component {
  constructor() {
    super();
    this.state = {
      billList: {},
      currentBill: {},
      displayBill: false,
    }
    this.toggleBillDisplay = this.toggleBillDisplay.bind(this);
    this.updateBillList = this.updateBillList.bind(this);
  }

  componentDidMount() {
    chrome.storage.sync.get(null, (data) => {
      this.setState({ billList: data })
    });
  }

  updateBillList() {
    chrome.storage.sync.get(null, (data) => {
      this.setState({ billList: data })
    });
  }
  deleteBill(billKey) {
    chrome.storage.sync.remove(billKey)
  }
  toggleBillDisplay() {
    this.state.displayAddBill ? this.setState({ displayAddBill: false }) : this.setState({ displayAddBill: true });
  }
  render() {
    const { billList, currentBill, displayAddBill, displayEditBill } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" />
          <h1 className="App-title">Welcome to Pay Time</h1>
        </header>
        <ListBill billList={billList} deleteBill={this.deleteBill} updateBillList={this.updateBillList} />
        <Bill displayBill={displayBill} currentBill={currentBill} toggleBillDisplay={this.toggleBillDisplay} updateBillList={this.updateBillList} />
        <Button color='purple' onClick={this.toggleBillDisplay}>
          Add Bill Reminder
        </Button>
      </div>
    );
  }
}

export default App;