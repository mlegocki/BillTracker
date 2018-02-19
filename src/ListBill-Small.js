/* global chrome */
import React from 'react';
import { Table, Icon, Checkbox, Button } from 'semantic-ui-react'
import { timeLeftCalc, dateCalc } from './utils/client/timeCalc';

const ListBillSmall = (props) => {
  const {
    billList,
    displaySmallList,
    toggleListSize,
    deleteBill,
    updateBillList,
    toggleBillDisplay
  } = props;

  // UPDATE TIMES

  Object.keys(billList).forEach(billKey => {
    let { freq, specificDate } = billList[billKey];
    let timeLeft = timeLeftCalc(freq, specificDate);
    chrome.storage.sync.set({ [billKey]: { ...billList[billKey], timeLeft } });
  })
  chrome.storage.sync.get(null, (data) => {
    console.log(data);
  });

  return (
    <div>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              <Icon name='calendar outline' /> Paid
            </Table.HeaderCell>
            <Table.HeaderCell>
              Type of Bill
            </Table.HeaderCell>
            <Table.HeaderCell>
              Due Date
            </Table.HeaderCell>
            <Table.HeaderCell>
              Time Left
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {billList && Object.keys(billList).map(bill => {
            return (
              <Table.Row>
                <Table.Cell collapsing>
                  <Checkbox slider />
                </Table.Cell>
                <Table.Cell>
                  {billList[bill].billType}
                </Table.Cell>
                <Table.Cell>
                  {dateCalc(billList[bill].specificDate)}
                </Table.Cell>
                <Table.Cell>
                  {dateCalc(billList[bill].timeLeft)}
                </Table.Cell>
              </Table.Row>
            )
          })}
        </Table.Body>
      </Table>
      <Button color='purple' onClick={() => toggleBillDisplay()}>
        Add Bill Reminder
        </Button>
      {
        displaySmallList &&
        <Button color='black' onClick={toggleListSize}>
          Display Detailed List
        </Button>
      }
    </div>
  );
}

export default ListBillSmall;
