/* global chrome */
import React, { Component } from 'react';
import { Button } from 'semantic-ui-react'
import logo from './Pay-Time.png';
import './App.css';

import { updateBillList, deleteBill, toggleAddBillDisplay, toggleEditBillDisplay } from './utils/client/app'

import AddBill from './AddBill';
import ListBill from './ListBill';

class App extends Component {
  constructor() {
    super();
    this.state = {
      billList: {},
      displayAddBill: false,
      displayEditBill: false,
    }
    this.toggleAddBillDisplay = toggleAddBillDisplay.bind(this);
    this.toggleEditBillDisplay = toggleEditBillDisplay.bind(this);
    this.updateBillList = updateBillList.bind(this);
  }

  componentDidMount() {
    chrome.storage.sync.get(null, (data) => {
      this.setState({ billList: data })
    });
  }

  render() {
    const { displayAddBill, billList } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" />
          <h1 className="App-title">Welcome to Pay Time</h1>
        </header>
        <ListBill billList={billList} deleteBill={deleteBill} toggleEditBillDisplay={toggleEditBillDisplay} />
        <AddBill displayAddBill={displayAddBill} toggleAddBillDisplay={toggleAddBillDisplay} updateBillList={updateBillList} />
        <Button color='purple' onClick={toggleAddBillDisplay}>
          Add Bill Reminder
        </Button>
      </div>
    );
  }
}

export default App;