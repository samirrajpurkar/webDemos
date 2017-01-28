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
// var promise = new Promise(function (resolve, reject) {
//   // do stuff
//   var isSuccessful = true;
//   if (isSuccessful) { //if everything is successful
//     resolve('Success');
//   }
//   else {
//     reject(Error('Failure'));
//   }
// });

// promise.then(function (val) { //success callback
//   console.log(val);
// }, function (val) { //rejection callback
//   console.log(val);
// });

// // Transform promise
// var promise1 = Promise.resolve('hello');
// // Transforming Values
// var promise2 = promise1.then(function (result) {
//   console.log(result); // logs hello
//   return result + ' - world';
// });

// promise2.then(function (result) {
//   console.log(result); // logs hello world;
// });

// // Chaining Promises
// chainPromise = Promise.resolve([1,2,3,4]);

// chainPromise.then(function (result) {
//   console.log(result); //logs [1,2,3,4]
//   return result.map(x => x * x);
// }).then(function (result2) {
//   console.log(result2); // logs [1,4,9,16]
//   return result2.filter(x => x > 10); //keeps elements greater than 10
// }).then(function (result3) {
//   console.log(result3); //logs [16]
//   return result3.toString() + '!!!';
// }).then(function (result4) {
//   console.log(result4); //logs '16!'
// }).catch(function (error) {
//   console.log(error);
// });

// // Returning a Promise within then()
// var spromise = Promise.resolve('hello sequencing async ');
// var spromise1 = spromise.then(function (result) {
//   console.log(result); //logs hello sequencying async
//   return Promise.resolve('12345'); // return a promise with a value of 12345
// });
// spromise1.then(function (result) {
//   console.log(result); // logs '12345'
// });

// Sequencing Asynchronous Operations
// If the code is not in sync then we get all variables set to undefined.
// var number = getRandomNumber();
// var name = getNameFromNumber(number);
// var age = getAgeFromName(name);

var delay = function (result) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve(result);
    }, 0);
  });
};

var getRandomNumber = function () {
  return delay(1);
};

var getNameFromNumber = function (number) {
  return delay('Ace');
};

var getAgeFromName = function (name) {
  return delay(25);
};

getRandomNumber().then(function (number) {
  console.log('Random Number : ', number); // 1
  return getNameFromNumber(number); // returns a promise
}).then(function (name) {
  console.log('Name : ', name);
  return getAgeFromName(name);
}).then(function (age) {
  console.log('Age :', age);
}).catch(function (error) {
  console.log(error);
});

// Promise All - process mulitple promises at the same time.
var apromise1 = Promise.resolve('hello');
var apromise2 = Promise.resolve({age: 2, height: 188});
var apromise3 = 42; // normal values work with Promise.all

Promise.all([apromise1, apromise2, apromise3]).then(function (result) {
  console.log(result);
}).catch(function (error) {
  console.log(error);
});

// Promise All - method call rejects when one of the Promises rejects
var rpromise1 = Promise.resolve('hello');
var rpromise2 = Promise.resolve({age: 2, height: 188});
var rpromise3 = Promise.reject('Promise returns a failure');

Promise.all([rpromise1, rpromise2, rpromise3])
  .then(function (result) {
    console.log(result);
  })
  .catch(function (error) {
    console.log(error);
  });