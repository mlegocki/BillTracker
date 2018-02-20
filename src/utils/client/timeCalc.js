/* global chrome */
import moment from 'moment';

export const updateTime = function (billList) {
  console.log(billList, 'UPDATE TIME CALC');
  Object.keys(billList).forEach(billKey => {
    let { freq, specificDate } = billList[billKey];
    let timeLeft = timeLeftCalc(freq, specificDate);
    chrome.storage.sync.set({ [billKey]: { ...billList[billKey], timeLeft } });
  })
  console.log("HIT");
}

export const timeLeftCalc = function (freq, specificDate) {
  let currentDate = new Date();   // in milliseconds
  return specificDate - currentDate.getTime();
}

export const dateCalc = function (specificDate) {
  return moment(specificDate, 'x').format('MMMM-Do');
}

// 31556952000 ms = 1 year
// 2629746000 ms = 1 month
// 604800000 ms = 1 week
// 86400000 ms = 1 day