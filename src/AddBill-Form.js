import React from 'react';
import { Modal, Form, Message, Radio } from 'semantic-ui-react';

const BillForm = (props) => {
  const { displaySuccess, frequency, setFrequency, toggleCalendar } = props
  return (
    <Form inverted success={this.displaySuccess}
    >
      <Form.Field width={10}>
        <label>Bill Name (e.g. "Electric")</label>
        <input placeholder='Enter your bill here...' />
      </Form.Field>
      <Form.Field width={6}>
        <label>Company Owed To</label>
        <input placeholder='Enter the company name here...' />
      </Form.Field>

      <Form.Group>
        <label>Choose Frequency of Payments</label>
        <Form.Field
          control={Radio}
          label='Every Month'
          value='m'
          checked={frequency === 'm'}
          onChange={
            () => {
              this.setFrequency('m');
              this.toggleCalendar();
            }}
          width={4}
        />
        <Form.Field
          control={Radio}
          label='Every Year'
          value='y'
          checked={frequency === 'y'}
          onChange={
            () => {
              this.setFrequency('y');
              this.toggleCalendar();
            }}
          width={4}
        />
        <Form.Field
          control={Radio}
          label='Every Week'
          value='w'
          checked={frequency === 'w'}
          onChange={
            () => {
              this.setFrequency('w');
              this.toggleCalendar();
            }}
          width={4}
        />
        <Form.Field
          control={Radio}
          label='Everyday'
          value='d'
          checked={frequency === 'd'}
          onChange={this.setFrequency}
          width={4}
        />
      </Form.Group>
      <Form.Field width={6}>
        <label>Start Date of Month</label>
        <input placeholder='Enter the company name here...' />
      </Form.Field>
      <Message
        success
        header='Form Completed'
        content="You've successfully added a bill reminder!"
      />
    </Form>
  );
}

export default BillForm;
