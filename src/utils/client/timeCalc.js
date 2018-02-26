/* global chrome */
import moment from 'moment';

export const dateDueCalc = function (specificDate) {
  return moment(specificDate, 'x').format('MMM-Do');
}

export const updateDueCalc = function (specificDate, frequency) {
  switch (frequency) {
    case 'Monthly':
      let dueDateYear = Number(moment(specificDate).format('YYYY'));
      let dueDateMonth = Number(moment(specificDate).format('MM'));
      let dueDateDay = Number(moment(specificDate).format('DD'));
      if (dueDateMonth === 12) {
        dueDateYear += 1;
        dueDateMonth = 1;
      }
      else dueDateMonth += 1;
      let updatedSpecificDate = Number(moment(dueDateMonth + '-' + dueDateDay + '-' + dueDateYear).format('x'));
      return Number(moment(updatedSpecificDate).format('x'));

    case 'Annually':
      specificDate += 86400000 * 365;
      return specificDate;

    case 'Weekly':
      specificDate += 86400000 * 7;
      return specificDate;
  }
}