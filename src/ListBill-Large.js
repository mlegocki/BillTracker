/* global chrome */
import React, { Component } from 'react';
import { Table, Icon, Checkbox, Button } from 'semantic-ui-react'
import { dateDueCalc } from './utils/client/timeCalc';

class ListBillLarge extends Component {
  constructor() {
    super()
  }

  componentDidMount() {
    this.props.setTimeLeft();
  }

  render() {

    const {
      billList,
      deleteBill,
      togglePaid,
      toggleBillDisplay,
      updateBillList
    } = this.props;

    return (
      <div>
        <Table singleLine striped celled textAlign={'center'}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell className='large-table-header-label'>
                <Icon name='calendar outline' /> Paid
              </Table.HeaderCell>
              <Table.HeaderCell className='large-table-header-label'>
                Type
              </Table.HeaderCell>
              <Table.HeaderCell className='large-table-header-label'>
                Company
              </Table.HeaderCell>
              <Table.HeaderCell className='large-table-header-label'>
                Due Date
              </Table.HeaderCell>
              <Table.HeaderCell className='large-table-header-label'>
                Time Left
              </Table.HeaderCell>
              <Table.HeaderCell className='large-table-header-label'>
                Frequency
              </Table.HeaderCell>
              <Table.HeaderCell className='large-table-header-label'>
                Edit Bill
              </Table.HeaderCell>
              <Table.HeaderCell className='large-table-header-label'>
                Delete Bill
            </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {billList && Object.keys(billList).map(bill => {
              return (
                <Table.Row textAlign={'center'}>
                  <Table.Cell collapsing className='large-table-row-entry'>
                    <Checkbox slider
                      onClick={
                        async () => { 
                          await togglePaid(bill);
                          await updateBillList();
                        }
                      }
                    />
                  </Table.Cell>
                  <Table.Cell className='large-table-row-entry-med'>
                    {billList[bill].billType}
                  </Table.Cell>
                  <Table.Cell className='large-table-row-entry-med'>
                    {billList[bill].companyOwed}
                  </Table.Cell>
                  <Table.Cell className='large-table-row-entry'>
                    {dateDueCalc(billList[bill].specificDate)}
                  </Table.Cell>
                  {
                    billList[bill].timeLeft > 0 &&
                    <Table.Cell className='large-table-row-entry-long'>
                      {Math.floor(billList[bill].timeLeft / 86400000) + ' Days, '}
                      {Math.round((billList[bill].timeLeft - (Math.floor(billList[bill].timeLeft / 86400000) * 24 * 3600000)) / 3600000) + ' Hours'}
                    </Table.Cell>
                  }
                  {
                    billList[bill].timeLeft < 0 &&
                    <Table.Cell className='large-table-row-entry-long'>
                      OVERDUE
                    </Table.Cell>
                  }
                  <Table.Cell className='large-table-row-entry'>
                    {billList[bill].frequency}
                  </Table.Cell>
                  <Table.Cell textAlign={'center'} className='large-table-row-entry'>
                    <div className='large-table-button-container'>
                      <Button id='large-table-edit-button' onClick={() => toggleBillDisplay(billList[bill])}>
                        <Icon name='edit' />
                      </Button>
                    </div>
                  </Table.Cell>
                  <Table.Cell textAlign={'center'} className='large-table-row-entry'>
                    <div className='large-table-button-container'>
                      <Button id='large-table-delete-button' onClick={() => {
                        deleteBill(bill);
                      }}
                      >
                        <Icon name='delete calendar' />
                      </Button>
                    </div>
                  </Table.Cell>
                </Table.Row>
              )
            })}
          </Table.Body>
        </Table>
      </div>
    );
  }
}

export default ListBillLarge;
