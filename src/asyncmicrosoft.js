// Callback functions
// Callback functions are functions that are passed as arguments to other
//functions to be executed later in time

function multiply(x, y) {
  return x * y;
}

function add(x, y) {
  return x + y;
}

// use a callback function to process two numbers.
function calculate(x, y, compute) {
  return compute(x, y);
}

var c = calculate(10, 5, function (x, y) {
  return x - y;
});

var d = calculate(2, 3, (x, y) => {return x ^ y;});

var a = calculate(2 , 3, add);
var m = calculate(4, 4, multiply);

// Example of methods that uses Callback Functions
var array = [1,2,3,4,5];

var marray = array.map(function (e) {
  return e * e;
});

var farray = array.filter(function (e) {
  return e % 2 === 0;
});

//Chaining callback functions with Continuation Passing Style
var myFunction = function (x, callback) {
  callback(x);
};
var answer = 0;

myFunction(10, function (x) { // callback 1
  var result_0 = x * x; // result_0 = 100
  myFunction(result_0, function (y) { //callback 2
    var result_1 = result_0 + result_0; // result_1 = 200
    myFunction(result_1, function (z) { //callback 3
      answer = result_1 + 100; // answer = 300
    });
  });
});

// asynchronous code using timer
// var asyncLog = function (value$) {
//   setTimeout(function ( ) {
//     console.log(value$);
//   }, 0);
// };

// var count = 0;
// var interval = setInterval(function () {
//   count++;
//   console.log(count);
//   if (count >= 2) {
//     clearInterval(interval);
//   }
// }, 1000);

// Creating a new Promise
var promise = new Promise(function (resolve, reject) {
  // do stuff
  var isSuccessful = true;
  if (isSuccessful) { //if everything is successful
    resolve('Success');
  }
  else {
    reject(Error('Failure'));
  }
});

promise.then(function (val) { //success callback
  console.log(val);
}, function (val) { //rejection callback
  console.log(val);
});

// Transform promise
var promise1 = Promise.resolve('hello');
// Transforming Values
var promise2 = promise1.then(function (result) {
  console.log(result); // logs hello
  return result + ' - world';
});

promise2.then(function (result) {
  console.log(result); // logs hello world;
});

// Chaining Promises
chainPromise = Promise.resolve([1,2,3,4]);

chainPromise.then(function (result) {
  console.log(result); //logs [1,2,3,4]
  return result.map(x => x * x);
}).then(function (result2) {
  console.log(result2); // logs [1,4,9,16]
  return result2.filter(x => x > 10); //keeps elements greater than 10
}).then(function (result3) {
  console.log(result3); //logs [16]
  return result3.toString() + '!!!';
}).then(function (result4) {
  console.log(result4); //logs '16!'
}).catch(function (error) {
  console.log(error);
});

// Returning a Promise within then()
var spromise = Promise.resolve('hello sequencing async ');
var spromise1 = spromise.then(function (result) {
  console.log(result); //logs hello sequencying async
  return Promise.resolve('12345'); // return a promise with a value of 12345
});
spromise1.then(function (result) {
  console.log(result); // logs '12345'
});

