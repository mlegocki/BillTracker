import React from 'react';
import { Modal, Button, Icon } from 'semantic-ui-react';
import InfiniteCalendar from 'react-infinite-calendar';
import { dispOptions, dates } from './utils/client/addBillUtils';

const Calendar = (props) => {
  const { displayCalendar, setDate, toggleCalendar, specificChange } = props
  return (
    <div>
      <Modal
        open={displayCalendar}
        basic size='small'
      >
        <Modal.Header>Select a Date</Modal.Header>
        <Modal.Content>
          <InfiniteCalendar
            width={500}
            height={300}
            selected={new Date()}
            displayOptions={dispOptions}
            onSelect={date => {
              console.log(Number(date.toString().slice(8, 11)));
            }}
          />
        </Modal.Content>
        <Modal.Actions>
          <Button
            basic color='green'
            onClick={toggleCalendar}
          >
            <Icon name='arrow left' />
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
}


export default Calendar;
