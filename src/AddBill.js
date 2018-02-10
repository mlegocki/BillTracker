/* global chrome */
import React, { Component } from 'react';
import { Button, Modal, Header, Icon, } from 'semantic-ui-react';
import BillForm from './AddBill-Form';
import Calendar from './AddBill-Calendar';


class AddBill extends Component {
  constructor() {
    super();
    this.state = {
      billName: '',
      companyOwed: '',
      frequency: '',
      specificDate: '',
      displayCalendar: false,
      displaySuccess: false,
    }
    this.setBillName = this.setBillName.bind(this);
    this.setCompanyOwed = this.setCompanyOwed.bind(this);
    this.setFrequency = this.setFrequency.bind(this);
    this.setDate = this.setDate.bind(this);

    this.toggleCalendar = this.toggleCalendar.bind(this);
    this.toggleSuccess = this.toggleSuccess.bind(this);
  }
  setBillName(e, { value }) {
    this.setState({ billName: value });
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
      billName: '',
      companyOwed: '',
      frequency: '',
      specificDate: '',
    });
  }
  render() {
    const { displayModal } = this.props
    const { billName, companyOwed, frequency, specificDate } = this.state;
    const formData = { billName, companyOwed, frequency, specificDate }
    return (
      <Modal
        open={displayModal}
        className={'add-bill-modal-container'}
        basic size='small'
      >
        <Header icon='add to calendar' content='Add a Bill Reminder' />
        <Modal.Content>
          <p>
            Enter your information below!
          </p>
          <BillForm
            billName={billName}
            companyOwed={companyOwed}
            frequency={frequency}

            setBillName={this.setBillName}
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
          >
            <Icon name='remove' /> Close
            </Button>
          <Button
            inverted
            color='green'
            onClick={() => {
              chrome.storage.sync.set({ [this.state]: formData });
              this.toggleSuccess();
              chrome.storage.sync.get(null, function (data) {
                console.log(data);
              });
              handleSubmit();
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

    // 
    // console.log(chrome.storage);
    // chrome.storage.sync.get(null, function (data) { console.info(data) });