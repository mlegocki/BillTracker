import React from 'react';
import { Button, Header, Icon, Modal, Portal, Segment } from 'semantic-ui-react';

const AddBill = () => {
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
        <p>Your inbox is getting full, would you like us to enable automatic archiving of old messages?</p>
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

export default AddBill;
