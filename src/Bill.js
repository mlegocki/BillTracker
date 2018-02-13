/* global chrome */
import React, { Component } from 'react';
import { Button, Modal, Header, Icon, } from 'semantic-ui-react';
import BillForm from './BillForm';
import Calendar from './BillCalendar';

// import { setBillType, setCompanyOwed, setFrequency, setDate, toggleCalendar, toggleSuccess, handleSubmit } from './utilsAddBill'

class Bill extends Component {
  constructor() {
    super();
    this.state = {
      billKey: '',
      billType: '',
      companyOwed: '',
      frequency: '',
      specificDate: 0,
      displayCalendar: false,
      displaySuccess: false,
    }
    this.setBillType = this.setBillType.bind(this);
    this.setCompanyOwed = this.setCompanyOwed.bind(this);
    this.setFrequency = this.setFrequency.bind(this);
    this.setDate = this.setDate.bind(this);

    this.toggleCalendar = this.toggleCalendar.bind(this);
    this.toggleSuccess = this.toggleSuccess.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { billKey, billType, companyOwed, frequency, specificDate } = nextProps.currentBill;
    this.setState({ billType, companyOwed, frequency, specificDate });
  }

  setBillType(e, { value }) {
    this.setState({ billType: value });
  }
  setCompanyOwed(e, { value }) {
    this.setState({ companyOwed: value });
  }
  setFrequency(value) {
    this.setState({ frequency: value });
  }
  setDate(value) {
    this.setState({ specificDate: value })
  }
  toggleCalendar() {
    this.state.displayCalendar ? this.setState({ displayCalendar: false }) : this.setState({ displayCalendar: true })
  }
  toggleSuccess() {
    this.state.displaySuccess ? this.setState({ displaySuccess: false }) : this.setState({ displaySuccess: true })
  }
  handleSubmit() {
    this.setState({
      billKey: '',
      billType: '',
      companyOwed: '',
      frequency: '',
      specificDate: 0,
    });
  }

  render() {
    const { displayBill, deleteBill, toggleBillDisplay, updateBillList, currentBill } = this.props;
    const { billType, companyOwed, frequency, specificDate } = this.state;
    const billKey = billType + '_' + companyOwed;
    const formData = { billKey, billType, companyOwed, frequency, specificDate };

    return (
      <Modal
        open={displayBill}
        basic size='small'
      >
        <Header icon='add to calendar' content='Add a Bill Reminder' />
        <Modal.Content>
          <p>
            Enter your information below!
          </p>
          <BillForm
            billType={billType}
            companyOwed={companyOwed}
            frequency={frequency}

            setBillType={this.setBillType}
            setCompanyOwed={this.setCompanyOwed}
            displaySuccess={this.state.displaySuccess}
            toggleCalendar={this.toggleCalendar}
            setFrequency={this.setFrequency}
          />
          {(this.state.displayCalendar) &&
            <Calendar
              displayCalendar={this.state.displayCalendar}

              toggleCalendar={this.toggleCalendar}
              setDate={this.setDate}
            />
          }
        </Modal.Content>
        <Modal.Actions>
          <Button
            inverted
            basic color='red'
            onClick={() => toggleBillDisplay()}
          >
            <Icon name='remove' /> Close
            </Button>
          <Button
            inverted
            color='green'
            onClick={() => {
              chrome.storage.sync.set({ [billKey]: formData });
              if (currentBill[Object.keys(currentBill)[0]] !== formData.billKey) updateBillList(currentBill[Object.keys(currentBill)[0]]);
              else updateBillList();
              this.handleSubmit();
              this.toggleSuccess();
            }}
          >
            <Icon name='checkmark' /> Submit
          </Button>
        </Modal.Actions>
      </Modal >
    );
  }
}

export default Bill;