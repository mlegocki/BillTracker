/* global chrome */
export const updateBillList = function () {
  chrome.storage.sync.get(null, (data) => {
    this.setState({ billList: data })
  });
}
export const deleteBill = function (billKey) {
  chrome.storage.sync.remove(billKey)
}
export const toggleAddBillDisplay = function () {
  this.state.displayAddBill ? this.setState({ displayAddBill: false }) : this.setState({ displayAddBill: true });
}
export const toggleEditBillDisplay = function () {
  this.state.displayEditBill ? this.setState({ displayEditBill: false }) : this.setState({ displayEditBill: true });
}