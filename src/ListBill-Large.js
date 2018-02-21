/* global chrome */
import React, { Component } from 'react';
import { Table, Icon, Checkbox, Button } from 'semantic-ui-react'
import LargeTable from './ListBill-Large-Table'

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
      displaySmallList,
      toggleListSize,
      deleteBill,
      toggleBillDisplay
    } = this.props;

    return (
      <div>
        <LargeTable
          billList={billList}
          deleteBill={deleteBill}
          toggleBillDisplay={toggleBillDisplay}
        />
      </div>
    );
  }
}

export default ListBillLarge;
