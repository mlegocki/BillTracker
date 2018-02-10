import React from 'react';
import { Form, Message, Radio } from 'semantic-ui-react';

const BillForm = (props) => {
  const { displaySuccess, frequency, setFrequency, toggleCalendar } = props
  return (
    <Form inverted success={displaySuccess}
    >
      <Form.Field>
        <label>Bill Name (e.g. "Electric")</label>
        <input placeholder='Enter your bill here...' />
      </Form.Field>
      <Form.Field>
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
              setFrequency('m');
              toggleCalendar();
            }}
        />
        <Form.Field
          control={Radio}
          label='Every Year'
          value='y'
          checked={frequency === 'y'}
          onChange={
            () => {
              setFrequency('y');
              toggleCalendar();
            }}
        />
        <Form.Field
          control={Radio}
          label='Every Week'
          value='w'
          checked={frequency === 'w'}
          onChange={
            () => {
              setFrequency('w');
              toggleCalendar();
            }}
        />
        <Form.Field
          control={Radio}
          label='Everyday'
          value='d'
          checked={frequency === 'd'}
          onChange={setFrequency}
        />
      </Form.Group>
      <Form.Field>
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
