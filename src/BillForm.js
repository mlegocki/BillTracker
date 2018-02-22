import React from 'react';
import { Form, Input, Message, Radio } from 'semantic-ui-react';

const BillForm = (props) => {
  const {
    billType,
    companyOwed,
    frequency,
    displaySuccess,
    displayFailure,

    setBillType,
    setCompanyOwed,
    setFrequency,
    toggleCalendar
  } = props

  return (
    <Form inverted success={displaySuccess} error={displayFailure}
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
        <label>Company Owed</label>
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
          checked={frequency === 'Monthly'}
          onChange={
            () => {
              setFrequency('Monthly');
              toggleCalendar();
            }}
        />
        <Form.Field
          control={Radio}
          label='Every Year'
          value={frequency}
          checked={frequency === 'Annually'}
          onChange={
            () => {
              setFrequency('Annually');
              toggleCalendar();
            }}
        />
        <Form.Field
          control={Radio}
          label='Every Week'
          value={frequency}
          checked={frequency === 'Weekly'}
          onChange={
            () => {
              setFrequency('Weekly');
              toggleCalendar();
            }}
        />
        <Form.Field
          control={Radio}
          label='Everyday'
          value={frequency}
          checked={frequency === 'Daily'}
          onChange={() => setFrequency('Daily')}
        />
      </Form.Group>
      <Message
        success
        header='Form Completed'
        content="You've successfully added a bill reminder! Add more reminders if you'd like to!"
      />
      <Message
        error
        header='Form Error'
        content=
        {
            billType.length > 12 || companyOwed.length > 12
            ?
            "You need to complete all fields listed above. Please limit your 'Bill Type' and 'Company Owed' to 12 or less characters"
            :
            'You need to complete all fields listed above.'
        }
      />
    </Form>
  );
}

export default BillForm;
