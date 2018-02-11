/* global chrome */
import React, { Component } from 'react';
import { Button } from 'semantic-ui-react'
import logo from './Pay-Time.png';
import './App.css';
import AddBill from './AddBill';
import ListBill from './ListBill';
// import { updateBillList, deleteBill, toggleAddBillDisplay, toggleEditBillDisplay } from './utilsApp'

class App extends Component {
  constructor() {
    super();
    this.state = {
      billList: {},
      displayAddBill: false,
      displayEditBill: false,
    }
    this.toggleAddBillDisplay = this.toggleAddBillDisplay.bind(this);
    this.toggleEditBillDisplay = this.toggleEditBillDisplay.bind(this);
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
  toggleAddBillDisplay() {
    this.state.displayAddBill ? this.setState({ displayAddBill: false }) : this.setState({ displayAddBill: true });
  }
  toggleEditBillDisplay() {
    this.state.displayEditBill ? this.setState({ displayEditBill: false }) : this.setState({ displayEditBill: true });
  }

  render() {
    const { displayAddBill, billList } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" />
          <h1 className="App-title">Welcome to Pay Time</h1>
        </header>
        <ListBill billList={billList} deleteBill={this.deleteBill} updateBillList={this.updateBillList} toggleEditBillDisplay={this.toggleEditBillDisplay} />
        <AddBill displayAddBill={displayAddBill} toggleAddBillDisplay={this.toggleAddBillDisplay} updateBillList={this.updateBillList} />
        <Button color='purple' onClick={this.toggleAddBillDisplay}>
          Add Bill Reminder
        </Button>
      </div>
    );
  }
}

export default App;