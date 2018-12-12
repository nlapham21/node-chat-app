const moment = require('moment');

// Jan 1st 1970 00:00:00 am
//
// Represented as milliseconds from this time
//

// var date = new Date();
// var months = ['Jan', 'Feb']
// console.log(date.getMonth());

// var date = moment();
// date.add(100, 'year');
// console.log(date.format('MMM Do, YYYY'));

new Date().getTime();
var someTimestamp = moment().valueOf();
console.log(someTimestamp);


var createdAt = 1234;
var date = moment(createdAt);
console.log(date.format('h:ss a'));