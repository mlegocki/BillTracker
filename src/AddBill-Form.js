import React from 'react';
import { Form, Input, Message, Radio } from 'semantic-ui-react';

const BillForm = (props) => {
  const {
    billName,
    companyOwed,
    frequency,
    displaySuccess,

    setBillName,
    setCompanyOwed,
    setFrequency,
    toggleCalendar } = props

  return (
    <Form inverted success={displaySuccess}
    >
      <Form.Field required>
        <label>Bill Type (e.g. "Electric")</label>
        <Input
          placeholder='Enter your bill type here...'
          onChange={setBillName}
          value={billName}
        />
      </Form.Field>
      <Form.Field required>
        <label>Company Owed To</label>
        <Input
          placeholder='Enter the company name here...'
          onChange={setCompanyOwed}
          value={companyOwed}
        />
      </Form.Field>
      <Form.Group required>
        <label>Choose Frequency of Payments</label>
        <Form.Field
          control={Radio}
          label='Every Month'
          value={frequency}
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
          value={frequency}
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
          value={frequency}
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
          value={frequency}
          checked={frequency === 'd'}
          onChange={setFrequency}
        />
      </Form.Group>
      <Message
        success
        header='Form Completed'
        content="You've successfully added a bill reminder!"
      />
    </Form>
  );
}

export default BillForm;
