import React from 'react';
import { Form, Input, Message, Radio } from 'semantic-ui-react';

const BillForm = (props) => {
  const {
    billType,
    companyOwed,
    frequency,
    displaySuccess,

    setBillType,
    setCompanyOwed,
    setFrequency,
    toggleCalendar
  } = props

  return (
    <Form inverted success={displaySuccess}
    >
      <Form.Field required>
        <label>Bill Type (e.g. "Electric")</label>
        <Input
          placeholder='Enter your bill type here...'
          onChange={setBillType}
          value={billType}
          defaultValue={billType}
        />
      </Form.Field>
      <Form.Field required>
        <label>Company Owed To</label>
        <Input
          placeholder='Enter the company name here...'
          onChange={setCompanyOwed}
          value={companyOwed}
          defaultValue={companyOwed}
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
          onChange={() => setFrequency('d')}
        />
      </Form.Group>
      <Message
        success
        header='Form Completed'
        content="You've successfully added a bill reminder! Add more reminders if you'd like to!"
      />
    </Form>
  );
}

export default BillForm;
