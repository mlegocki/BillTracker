/* global chrome */
import moment from 'moment';

export const dateDueCalc = function (specificDate) {
  return moment(specificDate, 'x').format('MMM-Do');
}

export const updateDueCalc = function (specificDate, frequency) {
  console.log('hit')
  console.log('inputs:', specificDate, frequency)
  switch (frequency) {
    case 'Monthly':
    console.log("HIT MONTHLY");
      let dueDateMonth = Number(moment(specificDate).format('MM'));
      let dueDateDay = Number(moment(specificDate).format('DD'));
      if (dueDateMonth === 12) dueDateMonth = 1;
      else dueDateMonth += 1;
      console.log('returned date:', Number(moment(specificDate).format('x')));
      return Number(moment(specificDate).format('x'));

    case 'Annually':
      specificDate += 86400000 * 365;
      return specificDate;

    case 'Weekly':
      specificDate += 86400000 * 7;
      return specificDate;

    case 'Daily':
      specificDate += 86400000 * 7;
      return specificDate;
  }
}

export const dayOfMonthCalc = function (specificDate) {
  return moment(specificDate, 'x').format('DD');
}

// 31556952000 ms = 1 year
// 2629746000 ms = 1 month
// 604800000 ms = 1 week
// 86400000 ms = 1 day