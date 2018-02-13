import React from 'react';
import { Table, Icon, Checkbox, Button } from 'semantic-ui-react'

const ListBillLarge = (props) => {
  const { billList, deleteBill, updateBillList, toggleBillDisplay } = props;
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
              Company Owed To
            </Table.HeaderCell>
            <Table.HeaderCell>
              Next Due Date
            </Table.HeaderCell>
            <Table.HeaderCell>
              Edit Bill
            </Table.HeaderCell>
            <Table.HeaderCell>
              Delete Bill
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
                  {billList[bill].companyOwed}
                </Table.Cell>
                <Table.Cell>
                  {billList[bill].specificDate}
                </Table.Cell>
                <Table.Cell>
                  <Button onClick={() => toggleBillDisplay(billList[bill])}>
                    <Icon name='edit' /> Edit
                  </Button>
                </Table.Cell>
                <Table.Cell>
                  <Button onClick={() => {
                    deleteBill(bill);
                    updateBillList();
                  }}
                  >
                    <Icon name='delete calendar' /> Delete
                  </Button>
                </Table.Cell>
              </Table.Row>
            )
          })}
        </Table.Body>
      </Table>
    </div>
  );
}

export default ListBillLarge;
