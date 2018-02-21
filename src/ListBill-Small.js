/* global chrome */
import React, { Component } from 'react';
import { Table, Icon, Checkbox, Button } from 'semantic-ui-react';
import SmallTable from './ListBill-Small-Table';

class ListBillSmall extends Component {
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
    } = this.props;

    return (
      <div>
        <SmallTable
          billList={billList}
        />
      </div>
    );
  }
}

export default ListBillSmall;
