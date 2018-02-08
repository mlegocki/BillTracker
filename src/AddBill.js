import React, { Component } from 'react';
import { Button, Modal, Form, Message, Header, Icon, Input, Radio } from 'semantic-ui-react';

class AddBill extends Component {
  constructor() {
    super();
    this.state = {
      frequency: ''
    }
    this.frequencyChange = this.frequencyChange.bind(this);
  }
  frequencyChange(e, { value }) {
    this.setState({ frequency: value });
  }
  render() {
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
          <Form inverted success>
            <Form.Field>
              <label>Bill Name</label>
              <input placeholder='Enter your bill here...' />
            </Form.Field>
            <Form.Field>
              <label>Company Bill Belongs To</label>
              <input placeholder='Enter your bill here...' />
            </Form.Field>
            <Form.Group>
              <label>Date</label>
              <Form.Field control={Radio} label='Specific Date Every Week' value='365' checked={this.state.frequency === '365'} onChange={this.frequencyChange} />
              <Form.Field control={Radio} label='Specific Date Every Month' value='365' checked={this.state.frequency === '365'} onChange={this.frequencyChange} />
              <Form.Field control={Radio} label='Specific Date Every Year' value='365' checked={this.state.frequency === '365'} onChange={this.frequencyChange} />
              <Form.Field control={Radio} label='Daily' value='1' checked={this.state.frequency === '1'} onChange={this.frequencyChange} />
              <Form.Field control={Radio} label='Weekly' value='7' checked={this.state.frequency === '7'} onChange={this.frequencyChange} />
              <Form.Field control={Radio} label='Monthly (30 Days)' value='30' checked={this.state.frequency === '30'} onChange={this.frequencyChange} />
              <Form.Field control={Radio} label='Annually' value='365' checked={this.state.frequency === '365'} onChange={this.frequencyChange} />
            </Form.Group>
            <Message
              success
              header='Form Completed'
              content="You've successfully added a bill reminder!"
            />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button basic color='red' inverted>
            <Icon name='remove' /> No
        </Button>
          <Button color='green' inverted>
            <Icon name='checkmark' /> Yes
        </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default AddBill;
