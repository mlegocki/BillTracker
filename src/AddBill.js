/* global chrome */
import React, { Component } from 'react';
import { Button, Modal, Header, Icon, } from 'semantic-ui-react';
import BillForm from './AddBill-Form';
import Calendar from './AddBill-Calendar';

// import { setBillType, setCompanyOwed, setFrequency, setDate, toggleCalendar, toggleSuccess, handleSubmit } from './utilsAddBill'

class AddBill extends Component {
  constructor() {
    super();
    this.state = {
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
      billType: '',
      companyOwed: '',
      frequency: '',
      specificDate: 0,
    });
  }
  render() {
    const { displayAddBill, toggleAddBillDisplay, updateBillList } = this.props
    const { billType, companyOwed, frequency, specificDate } = this.state;
    const billKey = billType + '_' + companyOwed;
    const formData = { billType, companyOwed, frequency, specificDate }
    return (
      <Modal
        open={displayAddBill}
        className={'add-bill-modal-container'}
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
            onClick={toggleAddBillDisplay}
          >
            <Icon name='remove' /> Close
            </Button>
          <Button
            inverted
            color='green'
            onClick={() => {
              chrome.storage.sync.set({ [billKey]: formData });
              this.toggleSuccess();
              chrome.storage.sync.get(null, function (data) {
                console.log(data);
              });
              updateBillList();
              this.handleSubmit();
            }}
          >
            <Icon name='checkmark' /> Submit
          </Button>
        </Modal.Actions>
      </Modal >
    );
  }
}

export default AddBill;