import React, { Component } from 'react';
import { Button, Modal, Form, Message, Header, Icon, Input, Radio, Dropdown } from 'semantic-ui-react';
import dates from './utils/client/dataList';

class AddBill extends Component {
  constructor() {
    super();
    this.state = {
      frequency: '',
      specificDate: 0,
      displaySuccess: false
    }
    this.frequencyChange = this.frequencyChange.bind(this);
    this.specificChange = this.specificChange.bind(this);
    this.toggleSuccess = this.toggleSuccess.bind(this);
  }
  frequencyChange(e, { value }) {
    this.setState({ frequency: value });
  }
  specificChange(e, { value }) {
    this.setState({ specificDate: value })
  }
  toggleSuccess() {
    this.state.displaySuccess ? this.setState({ displaySuccess: false }) : this.setState({ displaySuccess: true })
  }
  render() {
    console.log(this.state);
    return (
      <Modal
        trigger=
        {
          <Button color='purple'>
            Add Bill
          </Button>
        }
        basic size='small'
      >
        <Header icon='add to calendar' content='Add a Bill Reminder' />
        <Modal.Content>
          <p>
            Enter your information below!
        </p>
          <Form inverted success={this.state.displaySuccess}>
            <Form.Group>
              <Form.Field width={10}>
                <label>Bill Name (e.g. "Electric")</label>
                <input placeholder='Enter your bill here...' />
              </Form.Field>
              <Form.Field width={6}>
                <label>Company Owed To</label>
                <input placeholder='Enter the company name here...' />
              </Form.Field>
            </Form.Group>
            <Form.Group className={'frequency-container'}>
              <label>
                Choose Frequency of Payments
              </label>
              <Form.Field control={Radio} label='Every Month' value='m' checked={this.state.frequency === 'm'} onChange={this.frequencyChange} width={4} />
              <Form.Field control={Radio} label='Every Year' value='y' checked={this.state.frequency === 'y'} onChange={this.frequencyChange} width={4} />
              <Form.Field control={Radio} label='Every Week' value='w' checked={this.state.frequency === 'w'} onChange={this.frequencyChange} width={4} />
              <Form.Field control={Radio} label='Everyday' value='d' checked={this.state.frequency === 'd'} onChange={this.frequencyChange} width={4} />
            </Form.Group>
            {
              (this.state.frequency === 'w' || this.state.frequency === 'm' || this.state.frequency === 'y') &&
              <Dropdown placeholder='Select Date' fluid search selection options={dates} onChange={this.specificChange} />
            }
            <Message
              success
              header='Form Completed'
              content="You've successfully added a bill reminder!"
            />
          </Form>
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
