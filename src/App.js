/* global chrome */
import React, { Component } from 'react';
import { Button } from 'semantic-ui-react'
import logo from './Pay-Time.png';
import './App.css';
import Bill from './Bill';
import ListBill from './ListBill';
// import { updateBillList, deleteBill, toggleAddBillDisplay, toggleEditBillDisplay } from './utilsApp'

class App extends Component {
  constructor() {
    super();
    this.state = {
      billList: {},
      currentBill: {
        billKey: '',
        billType: '',
        companyOwed: '',
        frequency: '',
        specificDate: 0,
      },
      displayBill: false,
    }
    this.deleteBill = this.deleteBill.bind(this);
    this.toggleBillDisplay = this.toggleBillDisplay.bind(this);
    this.updateBillList = this.updateBillList.bind(this);
  }

  componentDidMount() {
    chrome.storage.sync.get(null, (data) => {
      this.setState({ billList: data })
    });
  }

  deleteBill(billKey) {
    chrome.storage.sync.remove(billKey)
    this.setState({
      currentBill: {
        billKey: '',
        billType: '',
        companyOwed: '',
        frequency: '',
        specificDate: 0,
      }
    });
  }
  updateBillList(billKey) {
    if (billKey) this.deleteBill(billKey);
    chrome.storage.sync.get(null, (data) => {
      console.log(data);
      this.setState({ billList: data })
    });
    this.setState({
      currentBill: {
        billKey: '',
        billType: '',
        companyOwed: '',
        frequency: '',
        specificDate: 0,
      }
    });
  }
  toggleBillDisplay(bill) {
    console.log('TOGGLE INPUT:', bill)
    if (bill) this.setState({ currentBill: bill });
    this.state.displayBill ? this.setState({ displayBill: false }) : this.setState({ displayBill: true });
  }
  render() {
    const { billList, currentBill, displayBill } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" />
          <h1 className="App-title">Welcome to Pay Time</h1>
        </header>
        <ListBill billList={billList} deleteBill={this.deleteBill} toggleBillDisplay={this.toggleBillDisplay} updateBillList={this.updateBillList} />
        <Bill displayBill={displayBill} currentBill={currentBill} deleteBill={this.deleteBill} toggleBillDisplay={this.toggleBillDisplay} updateBillList={this.updateBillList} />
        <Button color='purple' onClick={() => this.toggleBillDisplay()}>
          Add Bill Reminder
        </Button>
      </div>
    );
  }
}

export default App;