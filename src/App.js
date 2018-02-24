/* global chrome */
import React, { Component } from 'react';
import { Popup, Button, Icon } from 'semantic-ui-react'
import moment from 'moment'
import logo from './Pay-Time.png';
import './style-App.css';
import { updateDueCalc } from './utils/client/timeCalc';
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
        paid: false,
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
    chrome.storage.sync.get(null, async (data) => {
      await this.setState({ billList: data });
      await this.setTimeLeft();
    });
  }

  async setTimeLeft() {
    const { billList } = this.state;
    let currentDate = new Date();
    if (Object.keys(billList).length) {
      let updatedBillList = {};
      Object.keys(billList).forEach(async billKey => {
        let { specificDate, frequency } = billList[billKey];
        let timeLeft = specificDate - currentDate.getTime();
        if (timeLeft < 0 && billList[billKey].paid) {
          let updatedSpecificDate = updateDueCalc(specificDate, frequency);
          let updatedTimeLeft = updatedSpecificDate - currentDate.getTime();
          updatedBillList[billKey] = {
            ...billList[billKey],
            timeLeft: updatedTimeLeft,
            specificDate: updatedSpecificDate,
            paid: false
          }
        } else if (timeLeft < 0 && !billList[billKey].paid) {
          timeLeft = 'OVERDUE'
          updatedBillList[billKey] = { ...billList[billKey], timeLeft }
        } else {
          updatedBillList[billKey] = { ...billList[billKey], timeLeft }
        }
      });
      this.setState({ billList: updatedBillList });
      await chrome.storage.sync.set(updatedBillList);
    }
  }

  async deleteBill(billKey) {
    await chrome.storage.sync.remove(billKey)
    await chrome.storage.sync.get(null, async data => {
      await this.setState({
        billList: data,
        currentBill: {
          billKey: '',
          billType: '',
          companyOwed: '',
          frequency: '',
          paid: false,
          specificDate: 0,
          timeLeft: 0,
        }
      });
      this.setTimeLeft();
    });
  }

  updateBillList(billKey) {
    if (billKey) this.deleteBill(billKey);
    chrome.storage.sync.get(null, async data => {
      console.log('UPDATED DATA ENTRY:', data);
      await this.setState({
        billList: data,
        currentBill: {
          billKey: '',
          billType: '',
          companyOwed: '',
          frequency: '',
          paid: false,
          specificDate: 0,
          timeLeft: 0,
        }
      });
      this.setTimeLeft();
    });
  }

  async togglePaid(bill) {
    bill.paid = bill.paid ? false : true;
    await chrome.storage.sync.set({ [bill.billKey]: bill });
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
        <div className='app-header-container'>
          <img src={logo} className="app-logo" />
          <h1 className='app-title'>Pay Time</h1>
          {
            !displaySmallList &&
            <div className='app-button-container'>
              <Button basic id='app-button-add-bill' onClick={() => this.toggleBillDisplay()}>
                Add Bill Reminder
              </Button>
              <Button basic id='app-button-display-list' onClick={this.toggleListSize}>
                Display Condensed List
              </Button>
            </div>
          }
          {
            displaySmallList &&
            <div className='app-button-container'>
              <Popup
                id='app-button-help'
                trigger={<Icon size={'big'} name='question circle outline' />}
                content={"Click on the 'Display Detailed List' button to get started!"}
                on='hover'
              />
              <Button basic id='app-button-display-list' onClick={this.toggleListSize}>
                Display Detailed List
              </Button>
            </div>
          }
        </div>
        {
          this.state.displaySmallList &&
          <ListBillSmall
            billList={billList}
            displaySmallList={displaySmallList}
            setTimeLeft={this.setTimeLeft}
            togglePaid={this.togglePaid}
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
            setTimeLeft={this.setTimeLeft}
            togglePaid={this.togglePaid}
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
