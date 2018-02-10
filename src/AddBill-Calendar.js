import React from 'react';
import { Modal, Button, Icon } from 'semantic-ui-react';
import InfiniteCalendar from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css';
import { dispOptions } from './utils/client/addBillUtils';

const Calendar = (props) => {
  const { displayCalendar, setDate, toggleCalendar } = props
  return (
    <Modal
      open={displayCalendar}
      basic size='small'
    >
      <Modal.Header>Select a Date</Modal.Header>
      <InfiniteCalendar
        width={720}
        height={350}
        displayOptions={dispOptions}
        onSelect={date => {
          setDate(Number(date.toString().slice(8, 11)));
        }}
      />
      <Modal.Actions>
        <Button
          basic color='green'
          onClick={toggleCalendar}
        >
          <Icon name='arrow left' />
        </Button>
      </Modal.Actions>
    </Modal>
  );
}


export default Calendar;
