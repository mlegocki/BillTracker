export const setBillType = function (e, { value }) {
  this.setState({ billType: value });
}
export const setCompanyOwed = function (e, { value }) {
  this.setState({ companyOwed: value });
}
export const setFrequency = function (value) {
  this.setState({ frequency: value });
}
export const setDate = function (value) {
  this.setState({ specificDate: value })
}
export const toggleCalendar = function () {
  this.state.displayCalendar ? this.setState({ displayCalendar: false }) : this.setState({ displayCalendar: true })
}
export const toggleSuccess = function () {
  this.state.displaySuccess ? this.setState({ displaySuccess: false }) : this.setState({ displaySuccess: true })
}
export const handleSubmit = function () {
  this.setState({
    billType: '',
    companyOwed: '',
    frequency: '',
    specificDate: 0,
  });
}