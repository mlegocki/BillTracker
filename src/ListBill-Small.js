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
        {
          displaySmallList &&
          <Button color='black' onClick={toggleListSize}>
            Display Detailed List
          </Button>
        }
      </div>
    );
  }
}

export default ListBillSmall;
