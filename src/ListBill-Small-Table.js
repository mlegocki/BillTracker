/* global chrome */
import React from 'react';
import { Table, Icon, Checkbox } from 'semantic-ui-react';
import { dateCalc } from './utils/client/timeCalc';


const SmallTable = (props) => {

  const { billList } = props;

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
                {
                  billList[bill].timeLeft > 0 &&
                  <Table.Cell>
                    {Math.floor(billList[bill].timeLeft / 86400000) + ' Days, '}
                    {Math.round((billList[bill].timeLeft - (Math.floor(billList[bill].timeLeft / 86400000) * 24 * 3600000)) / 3600000) + ' Hours'}
                  </Table.Cell>
                }
                {
                  billList[bill].timeLeft < 0 &&
                  <Table.Cell>
                    OVERDUE
                  </Table.Cell>
                }
              </Table.Row>
            )
          })}
        </Table.Body>
      </Table>
    </div>
  );
}

export default SmallTable;
