import React from 'react';
import { Modal, Button, Icon } from 'semantic-ui-react';
import InfiniteCalendar from 'react-infinite-calendar';
import moment from 'moment';
import 'react-infinite-calendar/styles.css';
import { dispOptions } from './utils/client/calendarOptions';

const Calendar = (props) => {
  const { displayCalendar, setDate, toggleCalendar } = props
  return (
    <Modal
      open={displayCalendar}
      basic size='small'
    >
      <Modal.Header>Select a Date</Modal.Header>
      <InfiniteCalendar
        width={400}
        height={250}
        displayOptions={dispOptions}
        onSelect={date => {
          setDate(Number(moment(date).format('x')));
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
