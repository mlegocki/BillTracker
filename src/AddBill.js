import React, { Component } from 'react';
import { Button, Modal, Form, Message, Header, Icon, Input, Radio, Dropdown } from 'semantic-ui-react';
import BillForm from './AddBill-Form';
import Calendar from './AddBill-Calendar';


class AddBill extends Component {
  constructor() {
    super();
    this.state = {
      frequency: '',
      specificDate: '',
      displayCalendar: false,
      displaySuccess: false,
    }
    this.setFrequency = this.setFrequency.bind(this);
    this.setDate = this.setDate.bind(this);

    this.toggleCalendar = this.toggleCalendar.bind(this);
    this.toggleSuccess = this.toggleSuccess.bind(this);
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
  render() {
    const { displayModal } = this.props
    return (
      <Modal
        open={displayModal}
        inverted
        className={'add-bill-modal-container'}
        basic size='small'
      >
        <Header icon='add to calendar' content='Add a Bill Reminder' />
        <Modal.Content>
          <p>
            Enter your information below!
          </p>
          <BillForm
            displaySuccess={this.state.displaySuccess}
            frequency={this.state.frequency}
            setFrequency={this.setFrequency}
            toggleCalendar={this.toggleCalendar}
          />
          {
            <Calendar
              displayCalendar={this.state.displayCalendar}
              specificDate={this.state.specificDate}
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
            onClick={this.toggleSuccess}
          >
            <Icon name='checkmark' /> Submit
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default AddBill;
