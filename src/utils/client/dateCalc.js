const dateCalc = function (freq, specificDate) {
  let currentDate = new Date();   // in milliseconds
  return specificDate - currentDate.getTime();
  // switch (freq) {
  // case 'm':
  //   return specificDate - currentDate.getDate();
  // case 'y':
  //   return specificDate - currentDate.getDate();
  // case 'w':
  //   return specificDate - currentDate.getDate();
  // }
}

export default dateCalc;

// 31556952000 ms = 1 year
// 2629746000 ms = 1 month
// 604800000 ms = 1 week
// 86400000 ms = 1 day