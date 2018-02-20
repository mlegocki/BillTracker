/* global chrome */
import React, { Component } from 'react';
import { Button } from 'semantic-ui-react'
import logo from './Pay-Time.png';
import './App.css';
import Bill from './Bill';
import ListBillSmall from './ListBill-Small';
import ListBillLarge from './ListBill-Large';

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
        timeLeft: 0
      },
      displaySmallList: true,   // if false, will display large list
      displayBill: false,
    }
    this.setTimeLeft = this.setTimeLeft.bind(this);
    this.deleteBill = this.deleteBill.bind(this);
    this.updateBillList = this.updateBillList.bind(this);
    this.toggleBillDisplay = this.toggleBillDisplay.bind(this);
    this.toggleListSize = this.toggleListSize.bind(this);
  }

  componentDidMount() {
    chrome.storage.sync.get(null, (data) => {
      this.setState({ billList: data })
    });
  }

  setTimeLeft() {
    console.log("SET TIME LEFT FUNCTION")
    const { billList } = this.state;
    console.log("THIS.STATE.BILLLIST:", this.state.billList);
    console.log('CURRENT BILL LIST', billList);
    let currentDate = new Date();
    if (Object.keys(billList).length) {
      let updatedBillList = {};
      Object.keys(billList).forEach(billKey => {
        let { specificDate } = billList[billKey];
        let timeLeft = specificDate - currentDate.getTime();
        updatedBillList[billKey] = { ...billList[billKey], timeLeft }
      });
      console.log("UPDATED BILL LIST", updatedBillList)
      this.setState({ billList: updatedBillList });
    }
  }

  deleteBill(billKey) {
    chrome.storage.sync.remove(billKey)
    chrome.storage.sync.get(null, (data) => {
      this.setState({
        billList: data,
        currentBill: {
          billKey: '',
          billType: '',
          companyOwed: '',
          frequency: '',
          specificDate: 0,
        }
      });
    });
  }

  updateBillList(billKey) {
    if (billKey) this.deleteBill(billKey);
    chrome.storage.sync.get(null, (data) => {
      console.log('New Data Entry:', data);
      this.setState({
        billList: data,
        currentBill: {
          billKey: '',
          billType: '',
          companyOwed: '',
          frequency: '',
          specificDate: 0,
        }
      });
    });
  }
  toggleBillDisplay(bill) {
    if (bill) this.setState({ currentBill: bill });
    this.state.displayBill ? this.setState({ displayBill: false }) : this.setState({ displayBill: true });
  }
  toggleListSize() {
    if (this.state.displaySmallList) {
      this.setState({ displaySmallList: false })
      document.body.classList.add('master-container-false');
      document.body.classList.remove('master-container-true');
      document.getElementsByTagName("HTML")[0].classList.add('master-container-false');
      document.getElementsByTagName("HTML")[0].classList.remove('master-container-true');
    } else {
      this.setState({ displaySmallList: true });
      document.body.classList.add('master-container-true');
      document.body.classList.remove('master-container-false');
      document.getElementsByTagName("HTML")[0].classList.add('master-container-true');
      document.getElementsByTagName("HTML")[0].classList.remove('master-container-false');
    }
  }
  render() {
    const {
      billList,
      currentBill,
      displayBill,
      displaySmallList
    } = this.state;

    return (
      <div className={`master-container-${displaySmallList}`}>
        <header className="App-header">
          <img src={logo} className="App-logo" />
          <h1 className="App-title">Welcome to Pay Time</h1>
        </header>
        {
          this.state.displaySmallList &&
          <ListBillSmall
            billList={billList}
            displaySmallList={displaySmallList}
            setTimeLeft={this.setTimeLeft}
            toggleListSize={this.toggleListSize}
            deleteBill={this.deleteBill}
            toggleBillDisplay={this.toggleBillDisplay}
            updateBillList={this.updateBillList}
          />
        }
        {
          !this.state.displaySmallList &&
          <ListBillLarge
            billList={billList}
            displaySmallList={displaySmallList}
            toggleListSize={this.toggleListSize}
            deleteBill={this.deleteBill}
            toggleBillDisplay={this.toggleBillDisplay}
            updateBillList={this.updateBillList}
          />
        }
        <Bill
          displayBill={displayBill}
          currentBill={currentBill}
          setTimeLeft={this.setTimeLeft}
          deleteBill={this.deleteBill}
          toggleBillDisplay={this.toggleBillDisplay}
          updateBillList={this.updateBillList}
        />
      </div>
    );
  }
}

export default App;

    // const options = {
    //   type: "basic",
    //   title: "test popup with Chrome",
    //   message: "You have a payment due!",
    //   iconUrl: "Pay-Time.png"
    // }
    // const callback = function () {
    //   console.log('popup done!');
    // }
    // chrome.notifications.create(options, callback);
