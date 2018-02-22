/* global chrome */
import React, { Component } from 'react';
import { Table, Icon, Checkbox } from 'semantic-ui-react';
import { dateCalc } from './utils/client/timeCalc';

class ListBillSmall extends Component {
  constructor() {
    super()
  }

  componentDidMount() {
    this.props.setTimeLeft();
  }

  render() {
    const { billList } = this.props;

    return (
      <div>
        <Table singleLine striped celled textAlign={'center'}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell className='small-table-header-label'>
                <Icon name='calendar outline' /> Paid
              </Table.HeaderCell>
              <Table.HeaderCell className='small-table-header-label'>
                Type
              </Table.HeaderCell>
              <Table.HeaderCell className='small-table-header-label'>
                Due Date
              </Table.HeaderCell>
              <Table.HeaderCell className='small-table-header-label'>
                Time Left
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {billList && Object.keys(billList).map(bill => {
              return (
                <Table.Row>
                  <Table.Cell collapsing className='small-table-row-entry'>
                    <Checkbox slider />
                  </Table.Cell>
                  <Table.Cell className='small-table-row-entry'>
                    {billList[bill].billType}
                  </Table.Cell>
                  <Table.Cell className='small-table-row-entry'>
                    {dateCalc(billList[bill].specificDate)}
                  </Table.Cell>
                  {
                    billList[bill].timeLeft > 0 &&
                    <Table.Cell className='small-table-row-entry'>
                      {Math.floor(billList[bill].timeLeft / 86400000) + ' Days, '}
                      {Math.round((billList[bill].timeLeft - (Math.floor(billList[bill].timeLeft / 86400000) * 24 * 3600000)) / 3600000) + ' Hours'}
                    </Table.Cell>
                  }
                  {
                    billList[bill].timeLeft < 0 &&
                    <Table.Cell className='small-table-row-entry'>
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
}

export default ListBillSmall;
