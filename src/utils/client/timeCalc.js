import moment from 'moment';

export const timeLeftCalc = function (freq, specificDate) {
  let currentDate = new Date();   // in milliseconds
  return Math.floor((specificDate - currentDate.getTime()) / 86400000);
}

export const dateCalc = function (specificDate) {
  return moment(specificDate, 'x').format('MMMM-Do');
}

// 31556952000 ms = 1 year
// 2629746000 ms = 1 month
// 604800000 ms = 1 week
// 86400000 ms = 1 day